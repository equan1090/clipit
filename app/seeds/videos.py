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
    vid2 = Video(
        title='Great Escape',
        video_url="https://clipitcapstone.s3.us-west-1.amazonaws.com/The_Great_Escape.mp4",
        description='Clean escape, these people suck',
        likes_count=24,
        comment_count=0,
        created_at=datetime.now(),
        user_id=1
    )
    vid3 = Video(
        title='Better than Pinkward',
        video_url="https://clipitcapstone.s3.us-west-1.amazonaws.com/better_than_pinkward_again.mp4",
        description='Not really better than pinkward, but this clip is still insane',
        likes_count=40,
        created_at=datetime.now(),
        user_id=1
    )

    vid4 = Video(
        title='Clean Kill',
        video_url="https://clipitcapstone.s3.us-west-1.amazonaws.com/cleankill.mp4",
        description="One of my favorite clips I posted",
        likes_count = 20,
        created_at=datetime.now(),
        user_id=1)
    vid5 = Video(
        title='Thresh Sucks',
        video_url="https://clipitcapstone.s3.us-west-1.amazonaws.com/THRESH_BLOWS.mp4",
        description='One of the worst threshes I have ever seen in my life, get him outta here',
        likes_count = 43,
        created_at=datetime.now(),
        user_id=1
    )

    db.session.add(vid1)
    db.session.add(vid2)
    db.session.add(vid3)
    db.session.add(vid4)
    db.session.add(vid5)
    db.session.commit()


def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
