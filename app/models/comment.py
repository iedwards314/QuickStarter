from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)

    user = db.relationship("User", back_populates="comments")
    project = db.relationship("Project", back_populates="comments")

    def to_dict(self):
        return {
        'id': self.id,
        'comment': self.comment,
        'user_id': self.user_id,
        'project_id': self.project_id,
        'project_username': self.user.username,
        'user_image': self.user.image,
    }
