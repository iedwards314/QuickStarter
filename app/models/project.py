from .db import db

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    image = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    user = db.relationship("User", back_populates="projects")
    category = db.relationship("Category", back_populates="project")
    update = db.relationship("Update", back_populates="project", cascade="all, delete")
    reward = db.relationship("Reward", back_populates="project", cascade="all, delete")
    contributions = db.relationship("Contribution", back_populates="project", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="project", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'goal': self.goal,
            'end_date': self.end_date,
            'image': self.image,
            'user_id': self.user_id,
            'category_id': self.category_id,
        }
