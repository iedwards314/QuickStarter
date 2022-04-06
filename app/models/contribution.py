from .db import db

class Contribution(db.Model):
    __tablename__ = 'contributions'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"), nullable=False)

    user = db.relationship("User", back_populates="contributions")
    project = db.relationship("Project", back_populates="contributions")
    reward = db.relationship("Reward", back_populates="contributions")

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'project_title': self.project.title,
            'project_username': self.project.user.username,
            'reward_title': self.reward.title
        }
