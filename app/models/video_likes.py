from .db import db


class Like(db.Model):
    __tablename__='likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    users = db.relationship("User", back_populates='likes')
    videos = db.relationship("Video", back_populates='likes')
