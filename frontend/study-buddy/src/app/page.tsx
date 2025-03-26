// import { useState } from "react";
import { Suspense } from "react";
import { Upload } from "@/components/upload";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">StudyBuddy</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Upload Your Video
            </h2>
            <p className="text-muted-foreground">
              We&apos;ll convert it to audio, generate a transcript, and create
              a summary you can chat with.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <Upload />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
