import whisper
model = whisper.load_model("base")
result = model.transcribe("output_audio.mp3")
print(result["text"])
