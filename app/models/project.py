from .db import db
from app.models.contribution import Contribution

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    image = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    user = db.relationship("User", back_populates="projects")
    category = db.relationship("Category", back_populates="project")
    update = db.relationship("Update", back_populates="project", cascade="all, delete")
    reward = db.relationship("Reward", back_populates="project", cascade="all, delete")
    contributions = db.relationship("Contribution", back_populates="project", cascade="all, delete")
    comments = db.relationship("Comment", back_populates="project", cascade="all, delete")

    def to_dict(self):
        # print("REAWRD!!!!", self.reward[0].__dict__["title"])
        rewardArray = []
        for reward in self.reward:
            rewardArray.append({ "title": reward.__dict__["title"],
                                 "description": reward.__dict__["description"],
                                 "cost": reward.__dict__["cost"] })
        newList = sorted(rewardArray, key=lambda d: d['cost'])

        contributions = Contribution.query.filter(Contribution.project_id == self.id).all()
        contributionDicts = [contribution.to_dict() for contribution in contributions]
        contributionNum = len(contributionDicts)
        totalAmount = 0
        for contribution in contributions:
            totalAmount += contribution.amount

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'goal': self.goal,
            'end_date': self.end_date,
            'image': self.image,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'username': self.user.username,
            'rewards': newList,
            'completion': totalAmount
        }
