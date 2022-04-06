from flask import Blueprint, jsonify, request
from app.models import Contribution, db

contribution_routes = Blueprint('contributions', __name__)

@contribution_routes.route('/create', methods=["POST"])
def post_contribution():
    contribution = dict(request.json)
    if len(contribution) == 4:
        newContribution = Contribution(
            amount=contribution['amount'],
            project_id=contribution['project_id'],
            user_id=contribution['user_id'],
            reward_id=contribution['reward_id']
        )
        db.session.add(newContribution)
        db.session.commit()
        return newContribution.to_dict()
    if len(contribution) == 3:
        newContribution = Contribution(
            amount=contribution['amount'],
            project_id=contribution['project_id'],
            user_id=contribution['user_id'],
        )
        db.session.add(newContribution)
        db.session.commit()
        return newContribution.to_dict()


@contribution_routes.route('/<int:id>')
def get_contribution(id):
    contribution = Contribution.query.get(id)
    return contribution.to_dict()
