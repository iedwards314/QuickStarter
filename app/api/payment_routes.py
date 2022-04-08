from flask import Blueprint, jsonify, request
from app.models import Project, Contribution, db, Payment

payment_routes = Blueprint('payments', __name__)


@payment_routes.route('/addInfo', methods=["POST"])
def add_info():
    data = dict(request.json)
    pay_info = Payment(
        address=data['address'],
        card_number=data['card_number'],
        name=data['name'],
        area_code=data['area_code'],
        user_id=data['user_id']
    )
    db.session.add(pay_info)
    db.session.commit()
    return "Success"
