import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

const DropZone = ({ onFiles }: { onFiles: (files: File[]) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFiles,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-muted-foreground text-center">
          Drop your notes here....
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center m-4">
          <p className="text-muted-foreground text-center">
            Drag & drop your notes, images or PDFs here, or click to select
            files
          </p>
          <Button>Upload Files</Button>
        </div>
      )}
    </div>
  );
};

export default DropZone;
