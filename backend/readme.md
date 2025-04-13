# Study Buddy - Backend Component

The backend component of Study Buddy is built using Flask and provides a robust API for video processing, content analysis, and AI-powered features.

## Architecture

The backend follows a modular architecture with the following key components:

- **API Layer**: Flask-based REST API endpoints
- **Processing Layer**: Video and audio processing services
- **AI Services**: Integration with OpenAI and Hugging Face models
- **Storage Layer**: File management and caching system

## Key Components

### 1. Video Processing (`video_to_audio.py`)
- Converts uploaded videos to audio format
- Supports multiple video formats (MP4, AVI, MOV)
- Uses FFmpeg for conversion
- Handles large file processing

### 2. Audio Transcription (`audio_transcript.py`)
- Transcribes audio content to text
- Uses Whisper model for transcription
- Supports multiple languages
- Generates timestamped transcripts

### 3. Content Analysis (`summarize.py`)
- Generates content summaries
- Extracts key points and concepts
- Creates structured notes
- Uses OpenAI's GPT models

### 4. Q&A Service (`chat_service.py`)
- Processes user questions
- Provides context-aware answers
- Uses LangChain for question processing
- Maintains conversation context

### 5. Cache Management (`cache_manager.py`)
- Implements efficient caching
- Manages processed content storage
- Optimizes response times
- Handles cache invalidation

## API Endpoints

### Video Processing
- `POST /upload`: Upload and process video files
- `GET /status/<filename>`: Check processing status
- `GET /uploads/<filename>`: Serve uploaded videos

### Content Analysis
- `POST /chat/process`: Process text for Q&A
- `POST /chat/ask`: Ask questions about processed content
- `POST /chat/delete`: Clear processed content

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- FFmpeg installed on your system
- OpenAI API key

### Installation
1. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```bash
   python app.py
   ```

## Development

### Running Tests
```bash
python -m pytest
```

### Code Style
- Follow PEP 8 guidelines
- Use type hints for better code maintainability
- Document all functions and classes

### Deployment
For production deployment:
```bash
gunicorn app:app
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| OPENAI_API_KEY | OpenAI API key for AI services | Yes |
| PORT | Server port (default: 5004) | No |

## Error Handling

The backend implements comprehensive error handling for:
- File upload failures
- Processing errors
- API rate limiting
- Invalid requests
- System resource constraints

## Security Considerations

- Input validation for all endpoints
- File type verification
- Size limits for uploads
- Secure file storage
- API key protection

## Performance Optimization

- Asynchronous processing
- Efficient caching
- Resource cleanup
- Memory management
- Connection pooling
