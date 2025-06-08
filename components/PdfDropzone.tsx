"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { type UsePdfUploadReturn } from "@/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import File from "./icons/File";
import Pdf from "./icons/Pdf";
import Check from "./icons/Check";

export const formatBytes = (
  bytes: number,
  decimals = 2,
  size?: "bytes" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB"
) => {
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (bytes === 0 || bytes === undefined)
    return size !== undefined ? `0 ${size}` : "0 bytes";
  const i =
    size !== undefined
      ? sizes.indexOf(size)
      : Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

type PdfDropzoneContextType = Omit<
  UsePdfUploadReturn,
  "getRootProps" | "getInputProps"
>;

const PdfDropzoneContext = createContext<PdfDropzoneContextType | undefined>(
  undefined
);

type PdfDropzoneProps = UsePdfUploadReturn & {
  className?: string;
};

const PdfDropzone = ({
  className,
  children,
  getRootProps,
  getInputProps,
  ...restProps
}: PropsWithChildren<PdfDropzoneProps>) => {
  const isSuccess = restProps.isSuccess;
  const isActive = restProps.isDragActive;
  const isInvalid =
    (restProps.isDragActive && restProps.isDragReject) ||
    (restProps.errors.length > 0 && !restProps.isSuccess) ||
    restProps.files.some((file) => file.errors.length !== 0);

  return (
    <PdfDropzoneContext.Provider value={{ ...restProps }}>
      <div
        {...getRootProps({
          className: cn(
            "border-2 border-gray-300 rounded-3xl p-6 text-center transition-colors duration-300 text-foreground bg-card flex flex-col items-center justify-center lg:h-[460px]",
            className,
            isSuccess ? "border-solid border-success" : "border-dashed",
            isActive && "border-primary bg-primary/10",
            isInvalid && "border-destructive bg-destructive/10"
          ),
        })}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </PdfDropzoneContext.Provider>
  );
};

const PdfDropzoneContent = ({ className }: { className?: string }) => {
  const {
    files,
    setFiles,
    onUpload,
    resetUpload,
    loading,
    successes,
    errors,
    maxFileSize,
    maxFiles,
    isSuccess,
    uploadedUrls,
  } = usePdfDropzoneContext();

  const exceedMaxFiles = files.length > maxFiles;

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setFiles(files.filter((file) => file.name !== fileName));
    },
    [files, setFiles]
  );

  if (isSuccess) {
    return (
      <div className={cn("flex flex-col items-center gap-y-4", className)}>
        <div className="flex flex-row items-center gap-x-2 justify-center">
          <Check />
          <p className="text-success text-sm sm:text-xl">
            Successfully uploaded {files.length} PDF
            {files.length > 1 ? "s" : ""}
          </p>
        </div>

        {uploadedUrls.length > 0 && (
          <div className="flex flex-col gap-y-10 w-full max-w-md">
            <p className="text-sm text-muted-foreground">Uploaded files:</p>
            {uploadedUrls.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-background p-2 border rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl border bg-primary flex items-center justify-center shrink-0">
                    <Pdf />
                  </div>
                  <span className="text-md truncate">
                    {files[index]?.name || `File ${index + 1}`}
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => window.open(url, "_blank")}
                  className="text-xs"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button size="lg" onClick={resetUpload} className="mt-2">
          <Image src="/icons/rotatecck.svg" alt="rotate" className="mr-2" width={20} height={20} />
          Upload More PDFs
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {files.map((file, idx) => {
        const fileError = errors.find((e) => e.name === file.name);
        const isSuccessfullyUploaded = !!successes.find((e) => e === file.name);

        return (
          <div
            key={`${file.name}-${idx}`}
            className="flex items-center gap-x-4 border-b py-3 first:mt-4 last:mb-4"
          >
            <div className="h-12 w-12 rounded-xl border bg-primary flex items-center justify-center shrink-0">
              <Pdf />
            </div>

            <div className="shrink grow flex flex-col items-start truncate">
              <p
                title={file.name}
                className="text-sm font-medium truncate max-w-full"
              >
                {file.name}
              </p>
              {file.errors.length > 0 ? (
                <p className="text-xs text-destructive mt-1">
                  {file.errors
                    .map((e) =>
                      e.message.startsWith("File is larger than")
                        ? `File is larger than ${formatBytes(
                            maxFileSize,
                            2
                          )} (Size: ${formatBytes(file.size, 2)})`
                        : e.code === "file-invalid-type"
                        ? "Only PDF files are allowed"
                        : e.message
                    )
                    .join(", ")}
                </p>
              ) : loading && !isSuccessfullyUploaded ? (
                <p className="text-xs text-process mt-1">Uploading PDF...</p>
              ) : !!fileError ? (
                <p className="text-xs text-destructive mt-1">
                  Failed to upload: {fileError.message}
                </p>
              ) : isSuccessfullyUploaded ? (
                <p className="text-xs text-success mt-1">
                  Successfully uploaded PDF
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  {formatBytes(file.size, 2)}
                </p>
              )}
            </div>

            {!loading && !isSuccessfullyUploaded && (
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 justify-self-end text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveFile(file.name)}
              >
                <Image src="/icons/cancel.svg" alt="x" width={16} height={16} />
              </Button>
            )}
          </div>
        );
      })}

      {exceedMaxFiles && (
        <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded">
          <p className="text-sm text-destructive">
            You may upload only up to {maxFiles} PDF{maxFiles > 1 ? "s" : ""},
            please remove {files.length - maxFiles} file
            {files.length - maxFiles > 1 ? "s" : ""}.
          </p>
        </div>
      )}

      {files.length > 0 && !exceedMaxFiles && (
        <div className="mt-4 flex gap-2">
          <Button
            variant="default"
            onClick={onUpload}
            disabled={files.some((file) => file.errors.length !== 0) || loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading PDFs...
              </>
            ) : (
              <>
                <Image src="/icons/upload.svg" alt="rotate" className="mr-2" width={24} height={24} />
                Upload PDF{files.length > 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

const PdfDropzoneEmptyState = ({ className }: { className?: string }) => {
  const { maxFiles, maxFileSize, inputRef, isSuccess } =
    usePdfDropzoneContext();

  if (isSuccess) {
    return null;
  }

  return (
    <div className={cn("flex flex-col items-center gap-y-4", className)}>
      <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center">
        <File />
      </div>

      <div className="text-center">
        <p className="text-lg sm:text-2xl font-medium">
          Upload PDF{!!maxFiles && maxFiles > 1 ? "s" : ""}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop your PDF{maxFiles !== 1 ? "s" : ""} here, or{" "}
          <button
            onClick={() => inputRef.current?.click()}
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            browse files
          </button>
        </p>
      </div>

      <div className="flex flex-col items-center gap-y-1 text-xs sm:text-sm text-muted-foreground">
        {maxFiles && maxFiles > 1 && <p>Maximum {maxFiles} files allowed</p>}
        {maxFileSize !== Number.POSITIVE_INFINITY && (
          <p>Maximum file size: {formatBytes(maxFileSize, 2)}</p>
        )}
        <p>Only PDF files are supported</p>
      </div>
    </div>
  );
};

const usePdfDropzoneContext = () => {
  const context = useContext(PdfDropzoneContext);

  if (!context) {
    throw new Error("usePdfDropzoneContext must be used within a PdfDropzone");
  }

  return context;
};

export {
  PdfDropzone,
  PdfDropzoneContent,
  PdfDropzoneEmptyState,
  usePdfDropzoneContext,
};
