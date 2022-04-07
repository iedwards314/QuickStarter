from flask import Blueprint, jsonify, request
from app.models import Project, Contribution, db
from sqlalchemy import any_, or_

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

@project_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_project(id):
    project = dict(request.json)
    data = Project.query.get(project['id'])

    data.title = project['title'],
    data.description = project['description'],
    data.goal = project['goal'],
    data.end_date = project['end_date'],
    data.image = project['image'],
    data.user_id = project['user_id'],
    data.category_id = project['category_id'],

    db.session.commit()
    return data.to_dict()

@project_routes.route('/search/<searchTerms>')
def search_projects(searchTerms):
    terms = searchTerms.split("-")
    readyTerms = ["%" + term + "%" for term in terms]
    projects = Project.query.filter(or_(Project.title.ilike(any_(readyTerms)), Project.description.ilike(any_(readyTerms)))).all()
    return {"projects": [project.to_dict() for project in projects] }

@project_routes.route('/info')
def get_info():
    projects = Project.query.all()
    projectDicts = [project.to_dict() for project in projects]
    projectNum = len(projectDicts)

    contributions = Contribution.query.all()
    contributionDicts = [contribution.to_dict() for contribution in contributions]
    contributionNum = len(contributionDicts)
    totalAmount = 0
    for contribution in contributions:
        totalAmount += contribution.amount

    return {"projects": projectNum,
            "contributions": contributionNum,
            "total": totalAmount}
