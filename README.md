
# AI-Powered Chatbot with Supplier Information Fetching

This project is a chatbot application that integrates a database to fetch supplier and product details. It uses an open-source Large Language Model (LLM) to enhance responses with contextual understanding.



## Features

- Chatbot Interface: A user-friendly UI for interacting with the chatbot.
- Database Integration: Fetch supplier and product details from a database.
- LLM-Powered Responses: Enhances responses with context using Hugging Face or other open-source LLMs.
- FastAPI/Flask Backend: A robust backend for managing API requests.
- LangGraph Workflow: Manages the chatbot's conversational flow efficiently.


## Prerequisites

1. Python 3.8+
2.   Node.js   (for frontend, if applicable)
3.   Hugging Face Transformers   library
4.   Database  : MySQL/PostgreSQL/SQLite (configured in the backend)
5.   Virtual Environment   (optional but recommended)


## Installation

### Backend Setup

1. Clone the repository:
         
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
     

2. Create a virtual environment and activate it:
       
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
     

3. Install dependencies:
       
   pip install -r requirements.txt
     

4. Configure the database:
   - Update `config.py` or `.env` with your database credentials.
   - Run migrations (if using an ORM like SQLAlchemy):
       

5. Run the backend server:
       
   python app/main.py
   

### Frontend Setup

1. Navigate to the `frontend` directory:
       
   cd frontend
     

2. Install dependencies:
       
   npm install
     

3. Start the development server:
       
   npm start
     

## Usage

1. Open the chatbot interface in your browser (default: `http://127.0.0.1:3000`).
2. Enter a supplier's name in the chatbot text box to fetch details.
3. View structured responses with supplier and product information, enhanced by LLM.


## Configuration

-   LLM Model  : Ensure access to the desired Hugging Face model. Update the `model` parameter in `main.py` if needed.
-   Environment Variables  :
  - `DATABASE_URL`: Database connection string.
  - `HF_TOKEN`: Hugging Face token (if using gated models).


## Technologies Used

-   Backend  : Flask/FastAPI, SQLAlchemy, LangGraph
-   Frontend  : React.js
-   Database  : MySQL/PostgreSQL/SQLite
-   LLM  : Hugging Face Transformers, Open-source models (LLaMA 2, GPT-J, etc.)


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
       
   git checkout -b feature-name
     
3. Commit your changes:
       
   git commit -m "Add feature description"
     
4. Push to your branch:
       
   git push origin feature-name
     
5. Open a pull request.


## Contact

For questions or feedback, please contact:
-   Name  : Nishant Dixit
-   Email  : nishantpandit2004@gmail.com
-   LinkedIn  : https://linkedin.com/in/nishant-dixit-741472243
