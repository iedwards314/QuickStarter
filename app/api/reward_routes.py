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

@reward_routes.route('/<int:id>')
def get_rewards(id):
    rewards = Reward.query.filter(Reward.project_id == id).order_by(Reward.cost).all()
    rewardList = []
    for reward in rewards:
        rewardList.append(reward.to_dict())
    return jsonify(rewardList)

@reward_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_reward(id):
    Reward.query.filter(Reward.id == id).delete()
    db.session.commit()
    return jsonify("Success")

@reward_routes.route('/edit', methods=["PUT"])
def edit_reward():
    reward = dict(request.json)
    print(reward)
    dbReward = Reward.query.filter(Reward.id == reward['id']).all()
    dictReward = dbReward.to_dict()
    dbReward.title = reward['title']
    dbReward.description = reward['description']
    dbReward.cost = reward['cost']
    db.session.commit()
    return dictReward
