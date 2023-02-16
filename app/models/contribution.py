from .db import db, environment, SCHEMA, add_prefix_for_prod

class Contribution(db.Model):
    __tablename__ = 'contributions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("rewards.id")), nullable=True)

    user = db.relationship("User", back_populates="contributions")
    project = db.relationship("Project", back_populates="contributions")
    reward = db.relationship("Reward", back_populates="contributions", cascade="all, delete")

    def to_dict(self):
        if self.reward_id is None:
            return {
            'id': self.id,
            'amount': self.amount,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'project_title': self.project.title,
            'project_username': self.project.user.username,
            'project_image': self.project.image,
        }
        return {
            'id': self.id,
            'amount': self.amount,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'project_title': self.project.title,
            'project_username': self.project.user.username,
            'project_image': self.project.image,
            'reward_title': self.reward.title,
            'reward_cost': self.reward.cost,
        }
