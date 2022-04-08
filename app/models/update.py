from .db import db
from sqlalchemy.types import DateTime
from datetime import datetime

class Update(db.Model):
    __tablename__ = 'updates'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    update = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow())

    project = db.relationship("Project", back_populates="update")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'update': self.update,
            'image_url':self.image_url,
            'project': self.project_id,
            'created_at': self.created_at
        }
