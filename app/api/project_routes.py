from flask import Blueprint, jsonify, request
from app.models import Project, db

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<int:id>')
def get_project(id):
    project = Project.query.get(id)
    return project.to_dict()

@project_routes.route('/create', methods=['POST'])
def create_project():
    data = dict(request.json)
    newProject = Project(
        title = data['title'],
        description=data['description'],
        goal=data['goal'],
        end_date=data['end_date'],
        image=data['image'],
        user_id=data['user_id'],
        category_id=data['category_id'],
    )
    db.session.add(newProject)
    db.session.commit()
    print(newProject)
    return newProject.to_dict()

@project_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_project(id):
    # data = dict(request.json)
    project = Project.query.get(id)
    res = {"id": id}
    db.session.delete(project)
    db.session.commit()
    return res
