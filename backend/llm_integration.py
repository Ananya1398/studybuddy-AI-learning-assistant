import os
from dotenv import load_dotenv
import openai
import json
import hashlib

# Load environment variables
load_dotenv()

# Get OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

def get_llm_cache_key(transcript_text: str) -> str:
    """Generate a cache key for the LLM request"""
    return hashlib.sha256(transcript_text.encode()).hexdigest()

def get_cached_llm_response(cache_key: str) -> str:
    """Get cached LLM response if it exists"""
    cache_file = os.path.join("cache", "llm", f"{cache_key}.txt")
    if os.path.exists(cache_file):
        with open(cache_file, 'r') as f:
            return f.read()
    return None

def cache_llm_response(cache_key: str, response: str):
    """Cache the LLM response"""
    os.makedirs(os.path.join("cache", "llm"), exist_ok=True)
    cache_file = os.path.join("cache", "llm", f"{cache_key}.txt")
    with open(cache_file, 'w') as f:
        f.write(response)

def generate_notes(text):
    """Generate structured notes from text using OpenAI's GPT model"""
    try:
        # Create chat completion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that creates structured notes from text."},
                {"role": "user", "content": f"Please create structured notes from this text:\n\n{text}"}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        # Extract the generated notes from the response
        notes = response.choices[0].message['content']
        
        return notes
    except Exception as e:
        print(f"Error generating notes: {str(e)}")
        return str(e)