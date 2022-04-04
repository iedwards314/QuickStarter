from flask import Blueprint, jsonify, request
from app.models import Project, db

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
def projects():
    projects = Project.query.all()
    return {'projects': [project.to_dict() for project in projects]}

@project_routes.route('/<int:id>')
def get_project():
    project = Project.query.get(id)
    return project.to_dict()

@project_routes.route('/api/projects/create', methods=['POST'])
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
# @auth_routes.route('/signup', methods=['POST'])
# def sign_up():
#     """
#     Creates a new user and logs them in
#     """
#     form = SignUpForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         user = User(
#             username=form.data['username'],
#             email=form.data['email'],
#             password=form.data['password']
#         )
#         db.session.add(user)
#         db.session.commit()
#         login_user(user)
#         return user.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
