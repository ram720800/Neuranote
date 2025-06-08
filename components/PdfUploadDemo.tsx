"use client";

import {
  PdfDropzone,
  PdfDropzoneContent,
  PdfDropzoneEmptyState,
} from "@/components/PdfDropzone";
import { usePdfUpload } from "@/hooks/useFileUpload";

const PdfUploadDemo = () => {
  const props = usePdfUpload({
    bucketName: "neuranote-files", 
    path: "pdfs", 
    maxFiles: 2, 
    maxFileSize: 50 * 1024 * 1024,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <PdfDropzone {...props}>
        <PdfDropzoneEmptyState />
        <PdfDropzoneContent />
      </PdfDropzone>
    </div>
  );
};

export { PdfUploadDemo };
