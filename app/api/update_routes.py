from flask import Blueprint, jsonify, request
from app.models import Update, db

update_routes = Blueprint('updates', __name__)

@update_routes.route('/<int:id>')
def get_updates(id):
    updates = Update.query.filter(Update.project_id == id).order_by(Update.created_at).all()
    updatesList = []
    for update in updates:
        updatesList.append(update.to_dict())
    return jsonify(updatesList)

@update_routes.route('/create', methods=['POST'])
def create_update():
    data = dict(request.json)
    newUpdate = Update(
        title = data['title'],
        update=data['update'],
        image_url=data['image_url'],
        project_id=data['project_id'],
    )
    db.session.add(newUpdate)
    db.session.commit()
    return newUpdate.to_dict()

@update_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_update(id):
    # data = dict(request.json)
    update = Update.query.get(id)
    res = {"id": id}
    db.session.delete(update)
    db.session.commit()
    return res
