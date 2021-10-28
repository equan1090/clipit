from flask_wtf import FlaskForm
from wtforms import TextField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from datetime import datetime

class CommentForm(FlaskForm):
    content = TextField("Content", [DataRequired()])
    user_id = IntegerField("User Id", [DataRequired()])
    video_id = IntegerField("Video Id", [DataRequired()])

class EditCommentForm(FlaskForm):
    content = TextField("Content", [DataRequired()])
