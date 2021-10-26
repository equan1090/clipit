from app.models import db, Video
from datetime import datetime

def seed_videos():
    vid1 = Video(
        title='Pink Ward Shaco',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/yt5s.com-Pink+Ward+_The+SHACO+God_+Montage+-+League+of+Legends.mp4',
        description='Some of pinkwards greatest outplays and 200IQ moments',
        likes_count=500,
        comment_count=0,
        created_at=datetime.now(),
        user_id=1
    )

    db.session.add(vid1)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
