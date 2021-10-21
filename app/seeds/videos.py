from app.models import db, Video
from datetime import datetime

def seed_videos():
    vid1 = Video(
        title='Title',
        video_url='myurl',
        description='This is just a test',
        likes_count=0,
        comment_count=0,
        created_at=datetime.now(),
        user_id=1
    )

    db.session.add(vid1)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
