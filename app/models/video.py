from .db import db
from datetime import datetime
video_likes = db.Table(
    'video_likes',
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "video_id",
        db.Integer,
        db.ForeignKey("videos.id"),
        primary_key=True
    )
)

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    likes_count = db.Column(db.Integer, nullable=False, default=0)
    comment_count = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    video_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships

    users = db.relationship(
        "User",
        secondary=video_likes,
        back_populates="videos"
    )

    comments = db.relationship(
        'Comment',
        back_populates="videos",
        cascade="all, delete"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'likes_count': self.likes_count,
            'comment_count': self.comment_count,
            'user_id': self.user_id,
            'video_url': self.video_url,
            'created_at': self.created_at,
            'title': self.title
        }
