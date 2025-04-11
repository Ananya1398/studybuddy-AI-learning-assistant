from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.llms import HuggingFaceHub
import os

class ChatService:
    def __init__(self):
        self.text_vectorstores = {}
        self.text_conversation_chains = {}
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2",
            model_kwargs={"device": "cpu"}
        )
        
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

    def get_vectorstore(self, text_chunks):
        """Create vector store from text chunks"""
        vectorstore = FAISS.from_texts(texts=text_chunks, embedding=self.embeddings)
        return vectorstore

    def get_conversation_chain(self, vectorstore):
        """Create conversation chain for Q&A"""
        llm = HuggingFaceHub(repo_id="google/flan-t5-large", model_kwargs={"temperature":0.5, "max_length":512})
        memory = ConversationBufferMemory(
            memory_key='chat_history', return_messages=True)
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            memory=memory
        )
        return conversation_chain

    def process_text(self, text_id, text):
        """Process new text and create vector store and conversation chain"""
        chunks = self.get_text_chunks(text)
        vectorstore = self.get_vectorstore(chunks)
        conversation_chain = self.get_conversation_chain(vectorstore)
        
        self.text_vectorstores[text_id] = vectorstore
        self.text_conversation_chains[text_id] = conversation_chain
        
        return {"status": "success", "message": "Text processed successfully"}

    def ask_question(self, text_id, question):
        """Ask a question about the processed text"""
        if text_id not in self.text_conversation_chains:
            return {"error": "Text not found"}, 404
            
        conversation_chain = self.text_conversation_chains[text_id]
        response = conversation_chain({"question": question})
        
        return {
            "answer": response["answer"],
            "chat_history": response["chat_history"]
        }

    def delete_text(self, text_id):
        """Delete processed text and its associated data"""
        if text_id in self.text_vectorstores:
            del self.text_vectorstores[text_id]
        if text_id in self.text_conversation_chains:
            del self.text_conversation_chains[text_id]
        return {"status": "success", "message": "Text deleted successfully"}

# Create a singleton instance
chat_service = ChatService() 