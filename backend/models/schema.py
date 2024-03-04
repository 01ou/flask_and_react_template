#models/schema.py

from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from ..utils.util import validate_password

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
    

def add_user(username, password):
    # ユーザー名とパスワードがどちらも提供されていることを確認する
    if not username or not password:
        return {'error': 'Username and password are required.'}, 400
    
    # ユーザー名の重複をチェックする
    if User.query.filter_by(username=username).first():
        return {'error': 'Username already exists.'}, 409
    
    valid, message, error_code = validate_password(password)
    if not valid:
        return {'error': f'Invalid password.{message}'}, error_code
    
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return {'message': 'User created successfully.'}, 200


def verify_user(username, password):
    # ユーザー名とパスワードがどちらも提供されていることを確認する
    if not username or not password:
        return {'error': 'Username and password are required.'}, 400
    
    # ユーザーが存在するかを確認する
    user = User.query.filter_by(username=username).first()
    not_match_message = 'The login information does not match the account information in the system.'
    if not user:
        return {'error': not_match_message}, 404
    
    # パスワードの一致を確認する
    if user.password != password:
        return {'error': not not_match_message}, 401
    
    # ユーザーが認証された場合は、成功メッセージを返す
    return {'message': 'User authenticated successfully.'}, 200


def get_user_id(username):
    if not username:
        return jsonify({'error': 'Username is required.'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404
    
    user_id = user.id
    return jsonify({'user_id': user_id}), 200

