from app.models import db, Like

def seed_likes():
    first = Like(
        user_id=1,
        video_id=3
    )
    second = Like(
        user_id=1,
        video_id=4
    )
    third= Like(
        user_id=2,
        video_id=3
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()

def undo_likes():
    db.session.execute("truncate likes restart identity cascade")
    db.session.commit()
