from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from audio_transcript import transcribe_audio
from video_to_audio import convert_video_to_audio
from summarize import generate_summary
from llm_integration import generate_notes
from cache_manager import cache_manager
import json
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define Upload & Output Folders
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
CACHE_FOLDER = "cache"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(CACHE_FOLDER, exist_ok=True)

# Set the default port
PORT = int(os.environ.get("PORT", 5004))

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify server status."""
    return jsonify({"status": "running"}), 200

@app.route("/upload", methods=["POST"])
def upload_video():
    """Handles video upload, conversion to audio, transcription, summarization, and note generation."""
    if "video" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    video_path = os.path.join(UPLOAD_FOLDER, file.filename)
    audio_output = os.path.join(OUTPUT_FOLDER, f"{os.path.splitext(file.filename)[0]}.mp3")
    status_file = f"{audio_output}.status"

    try:
        # Save the uploaded video
        file.save(video_path)

        # Check if we have cached results
        cached_result = cache_manager.get_cached_result(video_path)
        if cached_result:
            print("Using cached result for", file.filename)
            return jsonify(cached_result), 200

        # Start the conversion process
        convert_video_to_audio(video_path, audio_output)
        
        # Wait for the status file to be created
        while not os.path.exists(status_file):
            time.sleep(0.1)
            
        # Read the initial status
        with open(status_file, 'r') as f:
            status = json.load(f)
            
        if status["status"] == "error":
            return jsonify({"error": status["error"]}), 500
            
        # Process the video if not cached
        transcript = transcribe_audio(audio_output)  # Transcribe audio
        print('Transcript:', transcript["text"])
        
        title = os.path.splitext(file.filename)[0]
        print('Title:', title)
        
        summary = generate_summary(title, transcript["text"])  # Generate summary
        print('\n\n\nSummary:', summary)
        
        notes = generate_notes(f'Summary: {summary} \n\n\nNotes:\n{transcript["text"]}')  # Generate structured notes
        print('Notes:', notes)

        # Prepare result
        result = {
            "message": "Processing successful",
            "audio_path": audio_output,
            "transcript": transcript,
            "summary": summary,
            "notes": notes,
            "status": "completed"
        }

        # Cache the result
        cache_manager.cache_result(video_path, result)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

@app.route("/status/<filename>", methods=["GET"])
def get_status(filename):
    """Get the current status of video processing."""
    try:
        # Check if the video is in uploads (processing not started)
        video_path = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.exists(video_path):
            return jsonify({
                "status": "not_found",
                "error": "Video file not found"
            }), 404

        # Check if we have cached results (processing completed)
        cached_result = cache_manager.get_cached_result(video_path)
        if cached_result:
            return jsonify({
                "status": "completed",
                "progress": 100,
                "step": "completed"
            })

        # Check status file for current processing state
        status_file = os.path.join(OUTPUT_FOLDER, f"{os.path.splitext(filename)[0]}.mp3.status")
        if os.path.exists(status_file):
            with open(status_file, 'r') as f:
                status = json.load(f)
                # Map the status to a step
                if status["status"] == "converting":
                    step = "converting"
                elif status["status"] == "transcribing":
                    step = "transcribing"
                elif status["status"] == "summarizing":
                    step = "summarizing"
                else:
                    step = status["status"]
                
                return jsonify({
                    "status": status["status"],
                    "progress": status.get("progress", 0),
                    "step": step,
                    "error": status.get("error")
                })

        # If we have the video but no status file, processing hasn't started
        return jsonify({
            "status": "pending",
            "progress": 0,
            "step": "pending"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    print(f"🚀 Server running on http://127.0.0.1:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
