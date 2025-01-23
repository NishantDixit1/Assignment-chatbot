from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Supplier(Base):
    __tablename__ = 'suppliers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    contact_info = Column(String(255))
    product_categories = Column(String(255))

    products = relationship("Product", back_populates="supplier")

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    brand = Column(String(255))
    price = Column(Integer)
    category = Column(String(255))
    description = Column(String(255))
    supplier_id = Column(Integer, ForeignKey('suppliers.id'))

    supplier = relationship("Supplier", back_populates="products")