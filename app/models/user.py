from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(300), nullable=False, default='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships
    # videos = db.relationship(
    #     "Video",
    #     secondary=video_likes,
    #     back_populates='users'
    # )

    videos = db.relationship(
        "Video", back_populates="users", cascade="all, delete"
    )

    likes = db.relationship("Like", back_populates='users')

    comments = db.relationship(
        "Comment",
        back_populates='users',
        cascade="all, delete"
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar_url': self.avatar_url,
            'created_at': self.created_at
        }
