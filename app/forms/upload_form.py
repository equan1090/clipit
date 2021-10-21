from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField

from wtforms.validators import DataRequired

class VideoForm(FlaskForm):
    # user_id = StringField("User Id", [DataRequired()])
    title = StringField('Title', [DataRequired()])
    description = TextField("Description")
    submit = SubmitField("Submit")
