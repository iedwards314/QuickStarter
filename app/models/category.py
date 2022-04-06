from .db import db

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))
    description = db.Column(db.Text, nullable=False)

    project = db.relationship("Project", back_populates="category")

    def to_dict(self):
        return {
        'id': self.id,
        'category': self.category,
        'image': self.image,
        'description': self.description,
    }
