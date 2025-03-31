from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from audio_transcript import transcribe_audio
from video_to_audio import convert_video_to_audio
from summarize import generate_summary
from llm_integration import generate_notes

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define Upload & Output Folders
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Set the default port
PORT = int(os.environ.get("PORT", 5001))

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

    try:
        file.save(video_path)  # Save the uploaded video
        convert_video_to_audio(video_path, audio_output)  # Convert video to audio
        transcript = transcribe_audio(audio_output)  # Transcribe audio
        print('Transcript:', transcript["text"])
        title = "Overview of Reinforcement Learning Approaches and Techniques"
        title = audio_output.split('/')[-1].split('.')[0]
        print('Title:', title)
        summary = generate_summary(title, transcript["text"])  # Generate summary
        print('\n\n\nSummary:', summary)
        notes = generate_notes(f'Summary: {summary} \n\n\nNotes:\n{transcript["text"]}')  # Generate structured notes
        print('Notes:', notes)
        return jsonify({
            "message": "Processing successful",
            "audio_path": audio_output,
            "transcript": transcript,
            "summary": summary,
            "notes": notes
        }), 200

    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    print(f"🚀 Server running on http://127.0.0.1:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
