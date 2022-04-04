from flask import Blueprint, jsonify, request
from app.models import Reward, db

reward_routes = Blueprint('rewards', __name__)

@reward_routes.route('/create', methods=["POST"])
def create_reward():
    # print(request.json)
    reward = dict(request.json)
    newReward = Reward(
        title=reward['title'],
        description=reward['description'],
        cost=reward['cost'],
        project_id=reward['project_id']
    )
    db.session.add(newReward)
    db.session.commit()
    return newReward.to_dict()
