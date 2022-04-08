from flask import Blueprint, jsonify, request
from app.models import Category, db, Project, User

category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def categories():
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}

@category_routes.route('/<int:id>')
def get_category(id):
    categories = Category.query.filter(Project.category_id == id).all()
    categoryList = []
    for category in categories:
        categoryList.append(category.to_dict())
    return jsonify(categoryList)

@category_routes.route('/project/<int:id>')
def get_project_category(id):
    projects = Project.query.filter(Project.category_id == id).all()
    projectList = []
    for project in projects:
        projectList.append(project.to_dict())
    return jsonify(projectList)
