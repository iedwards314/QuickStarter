from flask import Blueprint, jsonify, request
from app.models import Category, db, Project, User

category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def categories():
    categories = Category.query.all()
    print('YEPYEPYEP',{'categories': [category.to_dict() for category in categories]})
    return {'categories': [category.to_dict() for category in categories]}

@category_routes.route('/<int:id>')
def get_category(id):
    categories = Category.query.filter(Project.category_id == id).all()
    categoryList = []
    for category in categories:
        categoryList.append(category.to_dict())
    return jsonify(categoryList)
