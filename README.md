# Study Buddy

A lecture summarization and question-answering system that transforms video lectures into accessible, interactive learning resources.

## Overview

Study Buddy is an AI-powered educational tool that converts lecture videos into searchable text, generates comprehensive summaries, creates structured lecture notes, and provides an interactive Q&A system based on lecture content. The platform helps students efficiently review and understand lecture material through a user-friendly interface.

## Features

- **Video-to-Audio Conversion**: Upload lecture videos and automatically extract audio
- **Speech-to-Text Transcription**: Generate accurate text transcripts from lecture audio using OpenAI's Whisper model
- **Intelligent Summarization**: Create concise summaries from paraphrased sentences with relevance scoring
- **Structured Lecture Notes**: Generate well-organized notes from lecture content
- **Interactive Q&A** [In progress]: Ask questions about the lecture and receive contextually relevant answers
- **User-Friendly Interface**: Access all features through an intuitive, responsive UI

## Technology Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Python Flask
- **Video Processing**: Python moviepy
- **Speech Recognition**: OpenAI Whisper
- **Text Processing**: NLTK, T5 Tokenizer
- **Summarization**: Cosine Similarity for text scoring
- **Lecture Notes Generation**: OpenAI GPT-4o mini
- **Question-Answering** (In progress): FLAN-T5-Large, Instructor XL embeddings for vector-based semantic search

## System Requirements

- Node.js 18+ (Frontend)
- Python 3.8+ (Backend)
- FFmpeg (for media processing)

## Getting Started

### Backend Setup

1. Navigate to the backend directory

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Install FFmpeg (required for audio processing)

   ```bash
   # macOS
   brew install ffmpeg

   # Ubuntu/Debian
   sudo apt-get install ffmpeg

   # Windows
   # Download from https://ffmpeg.org/download.html
   ```

5. Run the Flask server
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Status

- [x] Video-to-audio conversion
- [x] Speech-to-text transcription
- [x] Summary and paraphrase generation
- [x] Lecture notes generation
- [x] Responsive UI development
- [ ] Question-answering module (in progress)

## Contributors

- Akshay Chavan
- Gaurav Tejwani
- Ananya Asthana
