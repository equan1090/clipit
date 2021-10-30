from flask import Blueprint, request
from flask_login import login_required
from app.models import Video, db, Comment
from app.forms import VideoForm, CommentForm, EditCommentForm

from app.aws import delete_from_s3, upload_file_to_s3, allowed_file, get_unique_filename, delete_from_s3
from sqlalchemy import desc, asc
video_routes = Blueprint('videos', __name__)

@video_routes.route('/<int:id>')
def get_video(id):
    videos = Video.query.filter(Video.id == id).first()
    return videos.to_dict()

@video_routes.route('/popular')
def get_popular():
    videos = Video.query
    videos = videos.order_by(Video.likes_count.desc()).all()
    return {
        'videos': [video.to_dict() for video in videos]
    }

@video_routes.route('')
def get_all_video():
    videos = Video.query
    videos = videos.order_by(Video.id.desc()).all()
    return {
        'videos': [video.to_dict() for video in videos]
    }

@video_routes.route('', methods=['POST'])
@login_required
def upload_video():

    if "video" not in request.files:
        return {"errors": "video required"}, 400

    video = request.files["video"]

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    video.filename = get_unique_filename(video.filename)
    upload = upload_file_to_s3(video)
    if "url" not in upload:
        return upload, 400
    url = upload["url"]

    title = request.form['title']
    description = request.form['description']
    user = request.form['user_id']

    new_video = Video(title=title, description=description, video_url=url, user_id=user)
    db.session.add(new_video)
    db.session.commit()
    return new_video.to_dict()

@video_routes.route('/<int:id>', methods=['PATCH'])
def edit_video(id):
    videos = Video.query.filter(Video.id == id).first()
    form = VideoForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    videos.title = data['title']
    videos.description = data['description']
    db.session.commit()
    return videos.to_dict()

@video_routes.route('/<int:id>', methods=['DELETE'])
def delete_video(id):
    deleted_video = Video.query.get(id)
    print('This is url to delete', deleted_video.video_url)
    if not delete_video:
        return 'Video does not exist'

    video_url = deleted_video.video_url
    delete_from_s3(video_url)
    db.session.delete(deleted_video)
    db.session.commit()
    videos = Video.query.filter(Video.user_id == id).all()
    return {"videos": [video.to_dict() for video in videos]}


#/videos/comments
@video_routes.route('/<int:videoId>/comments', methods=['POST'])
def create_comment(videoId):
    form = CommentForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            content=data['content'],
            video_id=data['video_id'],
            user_id=data['user_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        comments = Comment.query.filter(Comment.video_id == videoId).all()
        return {"comments": [comment.to_dict() for comment in comments]}
    else:
        return "Invalid Data"

@video_routes.route('/<int:videoId>/comments', methods=["DELETE"])
def delete_comment(videoId):
    body = request.json

    deleted_comment = Comment.query.filter(Comment.id == body['id']).first()

    db.session.delete(deleted_comment)
    db.session.commit()
    comments = Comment.query.filter(Comment.video_id == videoId).all()
    return {'comments': [comment.to_dict() for comment in comments]}



@video_routes.route('/<int:id>/comments')
def get_comment(id):
    comments = Comment.query.filter(Comment.video_id == id).all()
    # comments = comments.order_by(Comment.id.desc()).all()

    return {"comments": [comment.to_dict() for comment in comments]}

@video_routes.route('/<int:id>/comments', methods=['PATCH'])
def edit_comment(id):

    form = EditCommentForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        comment = Comment.query.filter(Comment.id == data["id"]).first()
        comment.content = data["content"]

        db.session.commit()

        comments = Comment.query.filter(Comment.video_id == id)
        return {"comments": [comment.to_dict() for comment in comments]}

    else:
        return "bad data in edit"
