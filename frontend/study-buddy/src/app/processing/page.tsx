"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filename = searchParams.get("filename") || "video";

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, name: "Converting video to audio" },
    { id: 2, name: "Generating transcript" },
    { id: 3, name: "Creating summary" },
  ];

  useEffect(() => {
    // Simulate processing steps
    const processVideo = async () => {
      // Step 1: Convert to audio
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 100));
      }

      setCurrentStep(2);
      setProgress(0);

      // Step 2: Generate transcript
      for (let i = 0; i <= 100; i += 2) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 150));
      }

      setCurrentStep(3);
      setProgress(0);

      // Step 3: Create summary
      for (let i = 0; i <= 100; i += 3) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 120));
      }

      // Navigate to results page
      router.push(`/results?filename=${encodeURIComponent(filename)}`);
    };

    processVideo();
  }, [filename, router]);

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
                    {progress}%
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
