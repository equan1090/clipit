from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Video

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/videos')
def user_videos(id):
    videos = Video.query.filter(Video.user_id == id).all()
    return {'videos': [video.to_dict() for video in videos]}

