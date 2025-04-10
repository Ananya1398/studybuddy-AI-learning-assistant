"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadIcon, File, X, Loader2 } from "lucide-react";
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

  const validateFile = (file: File) => {
    // Check if it's a video file
    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a video file");
      return false;
    }

    // Check file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      toast.error("File size must be less than 100MB");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setUploading(true);
    setProgress(0);
    
    try {
    const formData = new FormData();
    formData.append("video", file);

      const response = await fetch("http://localhost:5004/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Upload failed" }));
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      
      // Store the filename for status checking
      localStorage.setItem("currentFilename", file.name);
      
      // Navigate to processing page
      router.push(`/processing?filename=${encodeURIComponent(file.name)}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload video. Please try again.");
      setFile(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setFile(file);
        handleFileUpload(file);
    } else {
        toast.error("Please upload a video file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        setFile(file);
        handleFileUpload(file);
      } else {
        toast.error("Please upload a video file");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const showUploadProgress = async () => {
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
  };

  const initDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("fileDB", 1);
      
      request.onerror = () => {
        reject("Error opening database");
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files");
        }
      };
      
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  };

  const storeFile = async (file: File) => {
    try {
      const db = await initDB() as IDBDatabase;
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      
      return new Promise((resolve, reject) => {
        const request = store.put(file, "uploadedFile");
        
        request.onsuccess = () => {
          resolve(true);
        };
        
        request.onerror = () => {
          reject("Error storing file");
        };
      });
    } catch (error) {
      console.error("Error storing file:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      showUploadProgress();
      await handleFileUpload(file);

      // Simulate API call for processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store file in IndexedDB
      await storeFile(file);

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
      <div
        className={cn(
        "relative rounded-lg border-2 border-dashed p-12 text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
        uploading && "pointer-events-none opacity-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
            <input
              type="file"
        id="video-upload"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
        disabled={uploading}
            />

      {uploading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Uploading video...</p>
            <Progress value={progress} className="mt-2" />
              </div>
              </div>
      ) : (
        <label
          htmlFor="video-upload"
          className="block cursor-pointer space-y-4"
        >
          <div className="flex items-center justify-center">
            {file ? (
              <div className="flex items-center gap-2">
                <File className="h-8 w-8 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {file.name}
                </span>
                <button
                  type="button"
              onClick={(e) => {
                    e.preventDefault();
                removeFile();
              }}
                  className="ml-2 rounded-full p-1 hover:bg-muted"
            >
                  <X className="h-4 w-4" />
                </button>
          </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <UploadIcon className="h-8 w-8 text-primary" />
                <div className="space-y-1">
                  <p>Drag and drop your video here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: MP4, AVI, MOV (max 100MB)
                  </p>
                </div>
            </div>
          )}
        </div>
        </label>
      )}
    </div>
  );
}
