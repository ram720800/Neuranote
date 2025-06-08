import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type FileError,
  type FileRejection,
  useDropzone,
} from "react-dropzone";

const supabase = createClient();

interface FileWithPreview extends File {
  preview?: string;
  errors: readonly FileError[];
}

type UsePdfUploadOptions = {
  bucketName: string;
  path?: string;
  maxFileSize?: number;
  maxFiles?: number;
  cacheControl?: number;
  upsert?: boolean;
};

type UsePdfUploadReturn = ReturnType<typeof usePdfUpload>;

const usePdfUpload = (options: UsePdfUploadOptions) => {
  const {
    bucketName,
    path,
    maxFileSize = 50 * 1024 * 1024, 
    maxFiles = 1, 
    cacheControl = 3600,
    upsert = false,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [successes, setSuccesses] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false;
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true;
    }
    return false;
  }, [errors.length, successes.length, files.length]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          (file as FileWithPreview).preview = undefined;
          (file as FileWithPreview).errors = [];
          return file as FileWithPreview;
        });

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        (file as FileWithPreview).preview = undefined;
        (file as FileWithPreview).errors = errors;
        return file as FileWithPreview;
      });

      const newFiles = [...files, ...validFiles, ...invalidFiles];

      setFiles(newFiles);
    },
    [files, setFiles]
  );

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  });

  const onUpload = useCallback(async () => {
    setLoading(true);

    const filesWithErrors = errors.map((x) => x.name);
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files;

    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        // Generate unique filename to avoid conflicts
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const filePath = !!path ? `${path}/${filename}` : filename;

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          });

        if (error) {
          return {
            name: file.name,
            message: error.message,
            url: null,
          };
        } else {
          // Get public URL for the uploaded file
          const {
            data: { publicUrl },
          } = supabase.storage.from(bucketName).getPublicUrl(filePath);

          return {
            name: file.name,
            message: undefined,
            url: publicUrl,
          };
        }
      })
    );

    const responseErrors = responses
      .filter((x) => x.message !== undefined)
      .map(({ name, message }) => ({ name, message: message! }));

    setErrors(responseErrors);

    const responseSuccesses = responses.filter((x) => x.message === undefined);
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)])
    );
    setSuccesses(newSuccesses);

    const newUrls = responseSuccesses
      .map((x) => x.url)
      .filter((url): url is string => url !== null);
    setUploadedUrls((prev) => [...prev, ...newUrls]);

    setLoading(false);
  }, [files, path, bucketName, errors, successes, cacheControl, upsert]);

  const resetUpload = useCallback(() => {
    setFiles([]);
    setErrors([]);
    setSuccesses([]);
    setUploadedUrls([]);
  }, []);

  useEffect(() => {
    if (files.length === 0) {
      setErrors([]);
    }

    if (files.length <= maxFiles) {
      let changed = false;
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === "too-many-files")) {
          file.errors = file.errors.filter((e) => e.code !== "too-many-files");
          changed = true;
        }
        return file;
      });
      if (changed) {
        setFiles(newFiles);
      }
    }
  }, [files.length, setFiles, maxFiles]);

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    resetUpload,
    uploadedUrls,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes: ["application/pdf"],
    ...dropzoneProps,
  };
};

export { usePdfUpload, type UsePdfUploadOptions, type UsePdfUploadReturn };
