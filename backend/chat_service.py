from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceInstructEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.llms import HuggingFaceHub
import os
from dotenv import load_dotenv
import json
import hashlib

load_dotenv()

os.environ["HUGGINGFACEHUB_API_TOKEN"] = os.getenv("HUGGINGFACEHUB_API_TOKEN")

class ChatService:
    def __init__(self):
        self.text_vectorstores = {}
        self.text_conversation_chains = {}
        # Use a smaller, faster model for embeddings
        self.embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-base")
        self.embedding_cache = {}
        
    def get_text_chunks(self, text):
        """Split text into chunks for processing"""
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(text)
        return chunks

    def get_cached_embeddings(self, text):
        """Get cached embeddings or compute and cache new ones"""
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        if text_hash in self.embedding_cache:
            return self.embedding_cache[text_hash]
        
        embeddings = self.embeddings.embed_query(text)
        self.embedding_cache[text_hash] = embeddings
        return embeddings

    def get_vectorstore(self, text_chunks):
        """Create vector store from text chunks with caching"""
        # Use cached embeddings for faster vector store creation
        embeddings = [self.get_cached_embeddings(chunk) for chunk in text_chunks]
        vectorstore = FAISS.from_embeddings(
            text_embeddings=list(zip(text_chunks, embeddings)),
            embedding=self.embeddings
        )
        return vectorstore

    def get_conversation_chain(self, vectorstore):
        """Create conversation chain for Q&A with optimized settings"""
        llm = HuggingFaceHub(
            repo_id="google/flan-t5-base",  # Use base model instead of large for faster inference
            model_kwargs={
                "temperature": 0.3,  # Lower temperature for more focused responses
                "max_length": 256,   # Shorter max length for faster responses
                "top_p": 0.9,        # Add top_p for better response quality
                "do_sample": True    # Enable sampling for more natural responses
            }
        )
        memory = ConversationBufferMemory(
            memory_key='chat_history',
            return_messages=True,
            max_token_limit=1000  # Limit memory size
        )
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(
                search_kwargs={"k": 3}  # Limit number of retrieved chunks
            ),
            memory=memory,
            verbose=False  # Disable verbose logging
        )
        return conversation_chain

    def process_text(self, text_id, text):
        """Process new text and create vector store and conversation chain"""
        try:
            chunks = self.get_text_chunks(text)
            vectorstore = self.get_vectorstore(chunks)
            conversation_chain = self.get_conversation_chain(vectorstore)
            
            self.text_vectorstores[text_id] = vectorstore
            self.text_conversation_chains[text_id] = conversation_chain
            
            return {"status": "success", "message": "Text processed successfully"}
        except Exception as e:
            return {"error": str(e)}, 500

    def ask_question(self, text_id, question):
        """Ask a question about the processed text"""
        if text_id not in self.text_conversation_chains:
            return {"error": "Text not found"}, 404
            
        try:
            conversation_chain = self.text_conversation_chains[text_id]
            response = conversation_chain({"question": question})
            
            # Convert messages to serializable format
            chat_history = []
            for message in response["chat_history"]:
                chat_history.append({
                    "role": message.type,
                    "content": message.content
                })
            
            return {
                "answer": response["answer"],
                "chat_history": chat_history
            }
        except Exception as e:
            return {"error": str(e)}, 500

    def delete_text(self, text_id):
        """Delete processed text and its associated data"""
        try:
            if text_id in self.text_vectorstores:
                del self.text_vectorstores[text_id]
            if text_id in self.text_conversation_chains:
                del self.text_conversation_chains[text_id]
            return {"status": "success", "message": "Text deleted successfully"}
        except Exception as e:
            return {"error": str(e)}, 500

# Create a singleton instance
chat_service = ChatService() 