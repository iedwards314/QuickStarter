from flask import Blueprint, jsonify, request
from app.models import Update, db

update_routes = Blueprint('updates', __name__)

@update_routes.route('/')
def updates():
    updates = Update.query.all()
    return {'updates': [update.to_dict() for update in updates]}

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
