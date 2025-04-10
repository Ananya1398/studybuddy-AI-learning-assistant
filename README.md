# Study Buddy - Video Processing Application

A web application that processes educational videos to generate transcripts, summaries, and structured notes.

## Project Structure

```
.
├── backend/              # Flask backend server
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   └── ...
├── frontend/            # Next.js frontend
│   └── study-buddy/     # Next.js application
└── README.md            # This file
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Install FFmpeg (required for video processing):
   - **macOS**:
     ```bash
     # Install Homebrew if not already installed
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     
     # Install FFmpeg
     brew install ffmpeg
     ```
   - **Linux**:
     ```bash
     # Ubuntu/Debian
     sudo apt-get install ffmpeg
     
     # Fedora
     sudo dnf install ffmpeg
     ```
   - **Windows**: Download from [FFmpeg website](https://ffmpeg.org/download.html)

5. Start the backend server:
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:5004`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/study-buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Port Configuration

- Backend server runs on port `5004`
- Frontend development server runs on port `3000`

Make sure both servers are running and accessible at their respective ports.

## Features

- Video upload and processing
- Real-time progress tracking
- Audio extraction from videos
- Transcript generation
- Summary creation
- Structured notes generation

## Troubleshooting

1. **FFmpeg not found error**:
   - Ensure FFmpeg is installed correctly
   - Verify FFmpeg is in your system PATH
   - Restart the backend server after installation

2. **Connection refused errors**:
   - Verify both frontend and backend servers are running
   - Check that the backend is running on port 5004
   - Ensure no other services are using the required ports

3. **Upload failures**:
   - Check file size (max 100MB)
   - Verify file format (supported: MP4, AVI, MOV)
   - Ensure proper permissions in upload/output directories

## Development Notes

- Backend uses Flask with CORS enabled
- Frontend uses Next.js with TypeScript
- Status tracking implemented via status files
- Progress updates every 2 seconds
- Results are cached for faster subsequent processing
