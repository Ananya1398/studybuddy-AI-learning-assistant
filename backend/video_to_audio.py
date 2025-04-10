import os
import subprocess
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.config import FFMPEG_BINARY
import platform
import json
import time

# video_path = "Reinforcement_Learning.mp4"
# audio_output = "output_audio.mp3"

# clip = VideoFileClip(video_path)
# clip.audio.write_audiofile(audio_output)

def check_ffmpeg():
    """Check if FFmpeg is installed and accessible"""
    try:
        # Try to get FFmpeg path from moviepy settings first
        if FFMPEG_BINARY and os.path.exists(FFMPEG_BINARY):
            return True
            
        # Try to run ffmpeg command
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        system = platform.system()
        if system == 'Darwin':  # macOS
            raise RuntimeError(
                "FFmpeg is not installed. Please install it using one of these methods:\n"
                "1. Using Homebrew (recommended):\n"
                "   - First install Homebrew: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n"
                "   - Then install FFmpeg: brew install ffmpeg\n"
                "2. Or download from FFmpeg website: https://ffmpeg.org/download.html"
            )
        elif system == 'Linux':
            raise RuntimeError(
                "FFmpeg is not installed. Please install it using your package manager:\n"
                "Ubuntu/Debian: sudo apt-get install ffmpeg\n"
                "Fedora: sudo dnf install ffmpeg\n"
                "Or download from: https://ffmpeg.org/download.html"
            )
        else:
            raise RuntimeError(
                "FFmpeg is not installed. Please download and install from: https://ffmpeg.org/download.html"
            )

def convert_video_to_audio(video_path: str, audio_output: str) -> dict:
    """
    Convert video file to audio using FFmpeg.
    
    Args:
        video_path (str): Path to the input video file
        audio_output (str): Path where the output audio file should be saved
        
    Returns:
        dict: Status information about the conversion process
    """
    # Check if FFmpeg is installed
    check_ffmpeg()
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(audio_output), exist_ok=True)
    
    # Create status file
    status_file = f"{audio_output}.status"
    with open(status_file, 'w') as f:
        json.dump({
            "status": "converting",
            "progress": 0,
            "error": None
        }, f)
    
    try:
        # First check if the video file exists
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found: {video_path}")
            
        # Get video duration for progress tracking
        with VideoFileClip(video_path) as video:
            duration = video.duration
            
        # Create a temporary file to store progress
        progress_file = f"{audio_output}.progress"
        
        # Use FFmpeg to convert video to audio with progress tracking
        cmd = [
            'ffmpeg',
            '-i', video_path,
            '-vn',  # Disable video
            '-acodec', 'libmp3lame',  # Use MP3 codec
            '-ab', '192k',  # Set audio bitrate
            '-y',  # Overwrite output file if it exists
            '-progress', progress_file,  # Output progress to file
            audio_output
        ]
        
        # Start the conversion process
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        
        # Monitor progress
        progress = 0
        while process.poll() is None:
            if os.path.exists(progress_file):
                with open(progress_file, 'r') as f:
                    for line in f:
                        if 'out_time_ms' in line:
                            try:
                                time_ms = int(line.split('=')[1].strip())
                                progress = min(100, int((time_ms / (duration * 1000)) * 100))
                                # Update status file
                                with open(status_file, 'w') as f:
                                    json.dump({
                                        "status": "converting",
                                        "progress": progress,
                                        "error": None
                                    }, f)
                            except (ValueError, IndexError):
                                pass
            time.sleep(0.1)
        
        # Check if conversion was successful
        if process.returncode != 0:
            error = process.stderr.read()
            with open(status_file, 'w') as f:
                json.dump({
                    "status": "error",
                    "progress": 0,
                    "error": f"FFmpeg conversion failed: {error}"
                }, f)
            raise RuntimeError(f"FFmpeg conversion failed: {error}")
            
        # Update status to completed
        with open(status_file, 'w') as f:
            json.dump({
                "status": "completed",
                "progress": 100,
                "error": None
            }, f)
            
        return {
            "status": "completed",
            "progress": 100,
            "error": None
        }
        
    except Exception as e:
        # Update status file with error
        with open(status_file, 'w') as f:
            json.dump({
                "status": "error",
                "progress": 0,
                "error": str(e)
            }, f)
        raise