"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { createNeuranote } from "@/lib/actions/neuranote.actions";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Note from "./icons/Note";
import Pdf from "./icons/Pdf";

const formSchema = z.object({
  name: z.string().min(1, { message: "Neura name is required" }),
  subject: z.string().min(1, { message: "Subject name is required" }),
  topic: z.string().min(1, { message: "Topic name is required" }),
  voice: z.string().min(1, { message: "Voice type is required" }),
  style: z.string().min(1, { message: "Speaking style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
});

const NoteForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!extractedText.trim()) {
      toast.warning(
        "No extractable text found. Please upload a text-based PDF."
      );
      form.reset();
      return;
    }

    setLoadingSubmit(true);

    try {
      const newNote = await createNeuranote({
        ...values,
        extracted_text: extractedText,
      });

      if (newNote) {
        toast.success("Neuranote created successfully!");
        router.push(`/notes/${newNote.id}`);
      } else {
        toast.error("Failed to create note");
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("An error occurred while creating the note");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "Please upload a PDF file only.";
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return "File size must be less than 10MB.";
    }

    return null;
  };

  const processFile = async (selectedFile: File) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setUploadError(validationError);
      toast.error(validationError);
      return;
    }

    setFile(selectedFile);
    setLoadingExtract(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error (${res.status}): ${errorText}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Expected JSON, got: ${text.slice(0, 200)}`);
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Text extraction failed.");
      }

      setExtractedText(result.text || "");
      toast.success("PDF text extracted successfully!");
    } catch (error) {
      console.error("Error extracting text:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Text extraction failed.";
      setUploadError(errorMessage);
      toast.error(errorMessage);
      setFile(null);
      setExtractedText("");
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    await processFile(selectedFile);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      await processFile(droppedFile);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
    setExtractedText("");
    setUploadError("");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-4xl border-4 border-white shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)] p-4 w-full mt-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Neuranote topic"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Subject</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="capitalize input">
                        <SelectValue placeholder="Select the Neuranote subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem value={subject} key={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What should this Neuranote teach you?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this Neuranote should teach you"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Voice type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input">
                        <SelectValue placeholder="pick your voice assistance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote style</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Select the Neuranote style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 flex flex-col h-full">
            <FormLabel>Upload PDF</FormLabel>

            {!file ? (
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out cursor-pointer hover:bg-border/10 flex-1 flex items-center justify-center sm:min-h-0 ${
                  dragActive
                    ? "border-process bg-process/10"
                    : uploadError
                    ? "border-destructive bg-destructive/10"
                    : "border-border"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="text-center ">
                  <Pdf className="mx-auto" />
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      {dragActive
                        ? "Drop your PDF here"
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF files only, up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between p-2 border border-gray-200 bg-background rounded-lg mb-2">
                  <div className="flex items-center space-x-3">
                    <Note />
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                  >
                    <Image
                      src="/icons/cancel.svg"
                      alt="X"
                      width={16}
                      height={16}
                    />
                  </Button>
                </div>

                {extractedText && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs border border-success bg-green-100 text-success">
                      ✓ Text extracted successfully ({extractedText.length}{" "}
                      characters)
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {uploadError && (
              <p className="text-sm text-destructive mt-2">{uploadError}</p>
            )}

            {/* Loading State */}
            {loadingExtract && (
              <div className="flex items-center justify-center space-x-2 text-sm text-process mt-3 flex-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Extracting text from PDF...</span>
              </div>
            )}
          </div>
          <div className="flex items-end justify-end gap-4">
            <Button variant={"outline"} onClick={() => form.reset()}>
              Clear
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={loadingSubmit || loadingExtract}
            >
              {loadingSubmit ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Building your Neuranote...</span>
                </div>
              ) : (
                "Build your Neuranote"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NoteForm;
