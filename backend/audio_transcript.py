import whisper
import os
import json

def transcribe_audio(audio_path):
    """Transcribe audio file using Whisper"""
    try:
        # Load the Whisper model
        model = whisper.load_model("base")
        
        # Transcribe the audio
        result = model.transcribe(audio_path)
        
        return {
            "text": result["text"],
            "segments": result["segments"]
        }
    except Exception as e:
        print(f"Error in transcription: {str(e)}")
        return {"error": str(e)}

def transcribe_audio_timestamped(audio_path):
    result = model.transcribe(audio_path, word_timestamps=True)

    sentence_timestamps = []

    for segment in result["segments"]:
        sentence_data = {
            "text": segment["text"].strip(),
            "start_time": round(segment["start"], 2),
            "end_time": round(segment["end"], 2)
        }
        sentence_timestamps.append(sentence_data)

    json_output = json.dumps(sentence_timestamps, indent=4)
    # print(json_output)
    return json_output
