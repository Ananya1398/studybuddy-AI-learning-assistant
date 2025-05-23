"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { downloadPdfFromHtml } from "../../helpers/markdown-to-pdf";
import {
  Download,
  MessageSquare,
  FileText,
  Play,
  Pause,
  Volume2,
  VolumeX,
  GripVertical,
} from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import Image from "next/image";

// Mock data for demonstration
const mockTranscript = `
Speaker 1: Welcome to our discussion on artificial intelligence and its impact on society.
Speaker 2: Thank you for having me. It's an important topic that deserves attention.
Speaker 1: Let's start with the basics. How would you define AI for our audience?
Speaker 2: Artificial Intelligence refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding.
Speaker 1: And how is AI currently being used in everyday applications?
Speaker 2: AI is all around us. From voice assistants like Siri and Alexa to recommendation systems on streaming platforms and e-commerce sites. It's in our email spam filters, navigation apps, and increasingly in healthcare for diagnostics.
`;

const mockSummary = `
This discussion explores artificial intelligence and its societal impact. The speakers define AI as computer systems designed to perform tasks requiring human intelligence, including learning, reasoning, and language understanding. They highlight AI's prevalence in everyday applications such as voice assistants, recommendation systems, email filters, navigation apps, and healthcare diagnostics. The conversation emphasizes AI's growing importance and integration into daily life.
`;

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const filename = searchParams.get("filename") || "video";
  const [fileURL, setFileURL] = useState<string>("");
  const [activeTab, setActiveTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // load transcript and summary data from localStorage
  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("uploadResponse");
      console.log("Stored data from localStorage:", storedData);
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Parsed data:", parsedData);
          setData(parsedData);
        } catch (error) {
          console.error("Error parsing stored data:", error);
        }
      } else {
        console.log("No data found in localStorage");
      }
    };

    fetchData(); // Load data on mount

    // Optional: Detect localStorage updates (if set in another tab)
    window.addEventListener("storage", fetchData);
    return () => window.removeEventListener("storage", fetchData);
  }, []);

  // load video file from backend
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5004/uploads/${encodeURIComponent(filename)}`);
        if (response.ok) {
          const blob = await response.blob();
          const videoUrl = URL.createObjectURL(blob);
          setFileURL(videoUrl);
        } else {
          console.error("Failed to load video:", response.statusText);
        }
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    if (filename) {
      loadVideo();
    }

    // Cleanup function to revoke object URL
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
    };
  }, [filename]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Function to find the current sentence based on video time
  const findCurrentSentence = (time: number) => {
    if (!data?.transcript?.segments) return "";
    
    // Find the segment that contains the current time
    const currentSegment = data.transcript.segments.find(
      (segment: any) => time >= segment.start && time <= segment.end
    );
    
    return currentSegment ? currentSegment.text : "";
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      setCurrentSentence(findCurrentSentence(time));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const downloadPDF = () => {
    downloadPdfFromHtml(
      document.getElementById("lecture-notes-div")?.innerHTML
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
        <Image
              src="/logo.svg"
              alt="StudyBuddy Logo"
              width={64}
              height={64}
              className="h-64 w-64"
            />
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            New Upload
          </Button>
        </div>
      </header>

      <main className="m-4 py-8">
        <h2 className="text-3xl font-bold mb-6">{filename}</h2>

        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px] rounded-lg border"
        >
          {/* Video Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full p-4 space-y-4">
              <div className="relative bg-black aspect-video rounded-md overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src={fileURL.length > 0 ? fileURL : "/placeholder.mp4"}
                  poster="/placeholder.svg?height=720&width=1280"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={handleMute}>
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                />

                {/* Current spoken sentence */}
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-center text-lg">{currentSentence || "No speech detected"}</p>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle>
            <div className="h-full flex items-center justify-center">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </ResizableHandle>

          {/* Content Panel */}
          <ResizablePanel defaultSize={70} minSize={35}>
            <div className="h-full p-4">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="transcript"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Transcript</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="summary"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Notes</span>
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="mt-4">
                  <Card className="p-6 h-[500px] overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Full Transcript</h3>
                      <div className="whitespace-pre-line">
                        {data?.transcript?.segments ? (
                          data.transcript.segments.map((segment: any, index: number) => (
                            <div key={index} className="mb-2">
                              {segment.text}
                            </div>
                          ))
                        ) : (
                          <div>No transcript available</div>
                        )}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="summary" className="mt-4">
                  <Card className="p-6 h-[500px] overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          Summary & Notes
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadPDF}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download PDF</span>
                        </Button>
                      </div>
                      <div id="lecture-notes-div" className="prose markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {data?.notes || "No notes available"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="chat" className="mt-4">
                  <Card className="p-0 overflow-hidden h-[500px]">
                    <ChatInterface 
                      textId={filename} 
                      initialText={data?.transcript?.segments ? 
                        data.transcript.segments.map((segment: any) => segment.text).join(" ") 
                        : ""} 
                    />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
