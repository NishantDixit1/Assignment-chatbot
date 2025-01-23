from flask import Flask
from .database import engine, Base
from .models import Supplier, Product
from app.chatbot import chatbot
from flask import Flask, request, jsonify
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from transformers import pipeline
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import HuggingFacePipeline
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

app = Flask(__name__)

# Initialize the database
Base.metadata.create_all(bind=engine)

app.register_blueprint(chatbot, url_prefix='/chatbot')
@app.route('/')
def home():
    return "Chatbot Backend is Running!"

DATABASE_URL = "mysql+mysqlconnector://root:noddy123@localhost/chatbot"  # Replace with your database URL
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Load LLM
llm_pipeline =  pipeline(
    "text-generation",
    model="EleutherAI/gpt-j-6B",
    device=0) # Use a GPU if available
llm = HuggingFacePipeline(pipeline=llm_pipeline)

# LangChain setup
memory = ConversationBufferMemory(memory_key="chat_history")
prompt_template = """
You are an intelligent assistant. Use the database information to provide insightful and structured responses.
Database details: {db_info}
Chat history: {chat_history}
User query: {user_input}
"""
prompt = PromptTemplate(input_variables=["db_info", "chat_history", "user_input"], template=prompt_template)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Fetch supplier and product data from the database
    supplier = session.query(Supplier).filter(Supplier.name.ilike(user_input)).first()
    if not supplier:
        return jsonify({"response": "No supplier found with that name."})

    products = session.query(Product).filter(Product.supplier_id == supplier.id).all()
    product_details = "\n".join([f"{p.name}: {p.description}" for p in products])

    # Prepare database info
    db_info = f"Supplier: {supplier.name}, Contact: {supplier.contact_info}, Categories: {supplier.product_categories}, Products: {product_details}"

    # Generate response using LangChain and LLM
    response = chain.run(db_info=db_info, user_input=user_input)

    return jsonify({"response": response})



if __name__ == '__main__':
    app.run(debug=True) 
