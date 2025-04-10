# Video Summarization Backend

This is the backend component of the Video Summarization project. It handles video processing, audio extraction, transcription, and summarization.

## Setup Instructions

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)

### Virtual Environment Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
```

2. Activate the virtual environment:
- On macOS/Linux:
```bash
source venv/bin/activate
```
- On Windows:
```bash
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Project Structure
- `app.py`: Main Flask application
- `video_to_audio.py`: Handles video to audio conversion
- `audio_transcript.py`: Manages audio transcription
- `llm_integration.py`: Handles language model integration
- `summarize.py`: Contains summarization logic
- `uploads/`: Directory for uploaded videos
- `outputs/`: Directory for processed outputs

### Running the Application

1. Make sure the virtual environment is activated
2. Run the Flask application:
```bash
python app.py
```

The server will start on `http://localhost:5004`

### API Endpoints
- POST `/upload`: Upload a video file
- POST `/process`: Process the uploaded video
- GET `/status`: Check processing status
- GET `/result`: Get the final summary

### Dependencies
The project uses the following main dependencies:
- Flask: Web framework
- moviepy: Video processing
- openai-whisper: Audio transcription
- sentence-transformers: Text processing
- torch: Machine learning framework
- nltk: Natural language processing
- flask-cors: Cross-origin resource sharing

### Notes
- Make sure to have sufficient disk space for video processing
- The processing time depends on the video length and system resources
- Keep the virtual environment activated while working with the project
