from .db import db
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())


    project = db.relationship("Project", back_populates="category")

    def to_dict(self):
        return {
        'id': self.id,
        'category': self.category,
        'image': self.image,
        'description': self.description,
        'created_at': self.created_at,
    }
