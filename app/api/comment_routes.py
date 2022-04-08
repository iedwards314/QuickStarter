from flask import Blueprint, jsonify, request
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/create', methods=["POST"])
def post_comment():
    comment = dict(request.json)

    newComment = Comment(
        comment=comment['comment'],
        user_id=comment['user_id'],
        project_id=comment['project_id'],
    )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()


@comment_routes.route('/<int:id>')
def get_comments(id):
    comments = Comment.query.filter(Comment.project_id == id).all()
    commentList = []
    for comment in comments:
        commentList.append(comment.to_dict())
    return jsonify(commentList)

@comment_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_comment(id):
    data = dict(request.json)
    comment = Comment.query.get(id)
    res = {"id": id}
    db.session.delete(comment)
    db.session.commit()
    return res
