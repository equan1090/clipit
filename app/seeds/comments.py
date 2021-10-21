from app.models import db, Comment
from datetime import datetime

def seed_comments():
    comment1 = Comment()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
