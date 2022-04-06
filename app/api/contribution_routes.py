from flask import Blueprint, jsonify, request
from app.models import Contribution, db

contribution_routes = Blueprint('contributions', __name__)

@contribution_routes.route('/create', methods=["POST"])
def post_contribution():
    contribution = dict(request.json)
    newContribution = Contribution(
        amount=contribution['amount'],
        project_id=contribution['project_id'],
        user_id=contribution['user_id']
    )
    db.session.add(newContribution)
    db.session.commit()
    return "newContribution"
