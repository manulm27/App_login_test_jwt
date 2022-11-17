from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    token = relationship('Token', backref='user')

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Token(db.Model):
    __tablename__='token'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    token = db.Column(db.String(150), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'token': self.token
        }