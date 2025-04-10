import os
import json
import hashlib
from typing import Dict, Optional

class CacheManager:
    def __init__(self, cache_dir: str = "cache"):
        self.cache_dir = cache_dir
        self.cache_index_file = os.path.join(cache_dir, "cache_index.json")
        self.ensure_cache_dir()
        self.cache_index = self.load_cache_index()

    def ensure_cache_dir(self):
        """Create cache directory if it doesn't exist"""
        os.makedirs(self.cache_dir, exist_ok=True)

    def load_cache_index(self) -> Dict:
        """Load the cache index from file"""
        if os.path.exists(self.cache_index_file):
            with open(self.cache_index_file, 'r') as f:
                return json.load(f)
        return {}

    def save_cache_index(self):
        """Save the cache index to file"""
        with open(self.cache_index_file, 'w') as f:
            json.dump(self.cache_index, f, indent=2)

    def calculate_file_hash(self, file_path: str) -> str:
        """Calculate SHA-256 hash of a file"""
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

    def get_cached_result(self, file_path: str) -> Optional[Dict]:
        """Get cached result for a file if it exists"""
        file_hash = self.calculate_file_hash(file_path)
        if file_hash in self.cache_index:
            cache_entry = self.cache_index[file_hash]
            cache_file_path = os.path.join(self.cache_dir, f"{file_hash}.json")
            
            if os.path.exists(cache_file_path):
                with open(cache_file_path, 'r') as f:
                    return json.load(f)
        return None

    def cache_result(self, file_path: str, result: Dict):
        """Cache the processing result for a file"""
        file_hash = self.calculate_file_hash(file_path)
        cache_file_path = os.path.join(self.cache_dir, f"{file_hash}.json")
        
        # Save the result
        with open(cache_file_path, 'w') as f:
            json.dump(result, f, indent=2)
        
        # Update the index
        self.cache_index[file_hash] = {
            "original_file": file_path,
            "cache_file": cache_file_path,
            "timestamp": os.path.getmtime(file_path)
        }
        self.save_cache_index()

    def is_cache_valid(self, file_path: str) -> bool:
        """Check if cache exists and is valid for a file"""
        if not os.path.exists(file_path):
            return False
            
        file_hash = self.calculate_file_hash(file_path)
        if file_hash not in self.cache_index:
            return False
            
        cache_entry = self.cache_index[file_hash]
        cache_file_path = os.path.join(self.cache_dir, f"{file_hash}.json")
        
        # Check if cache file exists and original file hasn't been modified
        return (os.path.exists(cache_file_path) and 
                os.path.getmtime(file_path) <= cache_entry["timestamp"])

# Initialize the cache manager
cache_manager = CacheManager() 