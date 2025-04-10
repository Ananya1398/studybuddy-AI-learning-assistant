"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ProcessingStatus {
  status: string;
  step: string;
  progress: number;
  error?: string;
}

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename") || "video";

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { id: 1, name: "Converting video to audio", status: "converting" },
    { id: 2, name: "Generating transcript", status: "transcribing" },
    { id: 3, name: "Creating summary", status: "summarizing" },
  ];

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5004/status/${encodeURIComponent(filename)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch status");
        }

        const status: ProcessingStatus = await response.json();

        // Update progress based on status
        if (status.error) {
          setError(status.error);
          toast.error(status.error);
          return;
        }

        // Map backend status to step number
        let stepNumber = 1;
        if (status.step === "transcribing") stepNumber = 2;
        if (status.step === "summarizing") stepNumber = 3;
        if (status.status === "completed") {
          // Navigate to results page
          router.push(`/results?filename=${encodeURIComponent(filename)}`);
          return;
        }

        setCurrentStep(stepNumber);
        setProgress(status.progress || 0);

      } catch (error) {
        console.error("Error checking status:", error);
        toast.error("Failed to check processing status");
      }
    };

    // Check status every 2 seconds
    const statusInterval = setInterval(checkStatus, 2000);

    // Cleanup interval on unmount
    return () => clearInterval(statusInterval);
  }, [filename, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full p-6 space-y-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">Processing Error</h1>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Processing Your Video</h1>
          <p className="text-muted-foreground">
            Please wait while we process &quot;{filename}&quot;
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {steps.map((step) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : currentStep === step.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="h-4 w-4 flex items-center justify-center text-xs">
                        {step.id}
                      </span>
                    )}
                  </div>
                  <span
                    className={
                      currentStep >= step.id
                        ? "font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {step.name}
                  </span>
                </div>
                {currentStep > step.id && (
                  <span className="text-sm text-primary">Completed</span>
                )}
              </div>

              {currentStep === step.id && (
                <div className="space-y-1">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-right text-muted-foreground">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
