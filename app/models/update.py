from .db import db

class Update(db.Model):
    __tablename__ = 'updates'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    update = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)

    project = db.relationship("Project", back_populates="update")
