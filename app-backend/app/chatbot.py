from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from transformers import pipeline
from .database import SessionLocal
from .models import Supplier, Product

# Initialize Hugging Face's summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

chatbot = Blueprint('chatbot', __name__)

# Database session generator
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to get supplier information
@chatbot.route('/get_supplier_info', methods=['POST'])
def get_supplier_info():
    db = next(get_db())
    supplier_name = request.json.get('supplier_name')
    
    # Retrieve supplier information
    supplier = db.query(Supplier).filter(Supplier.name == supplier_name).first()
    if not supplier:
        return jsonify({"error": "Supplier not found"}), 404

    # Get all products from the supplier
    products = db.query(Product).filter(Product.supplier_id == supplier.id).all()
    
    # Summarize the supplier's product details
    product_details = "\n".join([f"{product.name}: {product.description}" for product in products])
    summary = summarizer(product_details, max_length=150, min_length=50, do_sample=False)

    return jsonify({
        "supplier": supplier.name,
        "contact_info": supplier.contact_info,
        "product_categories": supplier.product_categories,
        "summary": summary[0]['summary_text']
    })

@chatbot.route('/get_multiple_supplier_info', methods=['POST'])
def get_multiple_supplier_info():
    db = next(get_db())
    supplier_names = request.json.get('supplier_names')  # Expecting a list of names
    
    suppliers_info = []
    for supplier_name in supplier_names:
        supplier = db.query(Supplier).filter(Supplier.name == supplier_name).first()
        if not supplier:
            suppliers_info.append({"error": f"Supplier {supplier_name} not found"})
        else:
            products = db.query(Product).filter(Product.supplier_id == supplier.id).all()
            product_details = "\n".join([f"{product.name}: {product.description}" for product in products])
            summary = summarizer(product_details, max_length=150, min_length=50, do_sample=False)
            suppliers_info.append({
                "supplier": supplier.name,
                "contact_info": supplier.contact_info,
                "product_categories": supplier.product_categories,
                "summary": summary[0]['summary_text']
            })
    
    return jsonify(suppliers_info)

# Route to get product information
@chatbot.route('/get_product_info', methods=['POST'])
def get_product_info():
    db = next(get_db())
    product_name = request.json.get('product_name')
    
    # Retrieve product information
    product = db.query(Product).filter(Product.name == product_name).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404

    return jsonify({
        "name": product.name,
        "brand": product.brand,
        "price": product.price,
        "category": product.category,
        "description": product.description,
        "supplier": product.supplier.name
    })
