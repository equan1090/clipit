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
    vid6 = Video(
        title='Second Time Yone',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/2ndtimeYone.mp4',
        description='No wonder everyone plays Yone, hes busted',
        likes_count = 5,
        created_at=datetime.now(),
        user_id=2
    )
    vid7 = Video(
        title='A A trox',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/aatroxUnkillable.mp4',
        description='1v4 against multiple people',
        likes_count = 10,
        created_at=datetime.now(),
        user_id=2
    )

    vid9 = Video(
        title='ADC in season 11',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/adcseason11.mp4',
        description='Another season where adc is worthless',
        likes_count = 69,
        created_at=datetime.now(),
        user_id=2
    )
    vid10 = Video(
        title="Brand OP",
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/brand-baron-quadra.mp4',
        description="I'll do it myself, i dont need teamates",
        likes_count = 20,
        created_at=datetime.now(),
        user_id=2
    )

    vid12 = Video(
        title='Out F****** Played',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/brand-outplays-kha.mp4',
        description='Title says it all',
        likes_count = 420,
        created_at=datetime.now(),
        user_id=2
    )
    vid13 = Video(
        title='Stun trick',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/brandStun.mp4',
        description='Can you even react to this',
        likes_count = 65,
        created_at=datetime.now(),
        user_id=3
    )
    vid14 = Video(
        title='Dont need to hit everything',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/Dontneedtohiteverything.mp4',
        description='Darius just built different than everyone else',
        likes_count = 13,
        created_at=datetime.now(),
        user_id=3
    )
    vid15 = Video(
        title='Pentakill',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/olaf-penta.mp4',
        description='Easy pentakill',
        likes_count = 4,
        created_at=datetime.now(),
        user_id=3
    )
    vid16 = Video(
        title='Read her like a book',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/QuinnGotPredicted.mp4',
        description='I knew quinn was gonna vault off of me',
        likes_count = 30,
        created_at=datetime.now(),
        user_id=3
    )
    vid17 = Video(
        title='Clean Ult',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/sylas-seraphine.mp4',
        description='Super clean',
        likes_count = 0,
        created_at=datetime.now(),
        user_id=3
    )
    vid18 = Video(
        title='Where are you going?',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/settDeniesTrist.mp4',
        description='Trist thought she was got out?',
        likes_count = 12,
        created_at=datetime.now(),
        user_id=3
    )
    vid19 = Video(
        title='Ashe said what?',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/viego-quadra.mp4',
        description='Why ashe talking trash',
        likes_count = 12,
        created_at=datetime.now(),
        user_id=3
    )
    vid20 = Video(
        title='Drive By',
        video_url='https://clipitcapstone.s3.us-west-1.amazonaws.com/Vlad_Drive_By.webm',
        description='woosh',
        likes_count = 50,
        created_at=datetime.now(),
        user_id=3
    )

    db.session.add(vid1)
    db.session.add(vid2)
    db.session.add(vid3)
    db.session.add(vid4)
    db.session.add(vid5)

    db.session.add(vid6)
    db.session.add(vid7)
    
    db.session.add(vid9)
    db.session.add(vid10)

    db.session.add(vid12)
    db.session.add(vid13)
    db.session.add(vid14)
    db.session.add(vid15)
    db.session.add(vid16)
    db.session.add(vid17)
    db.session.add(vid18)
    db.session.add(vid19)
    db.session.add(vid20)

    db.session.commit()


def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
