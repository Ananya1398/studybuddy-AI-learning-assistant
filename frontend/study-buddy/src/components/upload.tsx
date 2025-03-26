"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadIcon, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Upload() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith("video/")) {
      setFile(droppedFile);
    } else {
      toast("Invalid file type", {
        description: "Please upload a video file.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simulate upload progress
      const uploadProgress = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(uploadProgress);
            return 100;
          }
          return newProgress;
        });
      }, 300);

      // Simulate API call for processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const db = await window.indexedDB.open("fileDB", 1);
      db.onsuccess = () => {
        const transaction = db.result.transaction("files", "readwrite");
        const store = transaction.objectStore("files");
        store.put(file, "uploadedFile"); // Save file to IndexedDB
      };

      // setFileURL(URL.createObjectURL(file));

      const fileURL = URL.createObjectURL(file);
      localStorage.setItem("fileURL", fileURL);
      router.push(`/processing?filename=${encodeURIComponent(file.name)}`);
    } catch (error) {
      console.error(error);
      toast("Upload failed", {
        description: "There was an error uploading your video.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          file ? "bg-muted/50" : "hover:bg-muted/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && document.getElementById("file-upload")?.click()}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <UploadIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drag and drop your video here
              </p>
              <p className="text-sm text-muted-foreground">
                Or click to browse files
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              disabled={uploading}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>

      {file && (
        <div className="space-y-4">
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {progress}%
              </p>
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Upload and Process"}
          </Button>
        </div>
      )}
    </div>
  );
}
