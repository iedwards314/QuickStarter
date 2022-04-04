from flask import Blueprint, jsonify
from app.models import Project

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<int:id>')
def get_project():
    project = Project.query.get(id)
    return project.to_dict()

# @project_routes.route('/<int:id>')
# @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
