# api/auth.py

from flask import Blueprint, jsonify, request
from backend.models.schema import add_user, verify_user
from backend.utils.util import generate_auth_token

bp = Blueprint('auth', __name__)

# ユーザーがログインした際の認証トークンを管理する辞書
# ユーザーごとにトークンを保存しておくことで、ログインの状態を管理します
auth_tokens = {}

@bp.route('/login', methods=['POST'])
def login():
    data = request.json  # JSON データを取得
    
    # フォームデータから username と password を安全に取得する
    username = data.get('username')
    password = data.get('password')

    # ログインの確認
    response, status_code = verify_user(username, password)

    if status_code == 200:
        # ログイン成功時に認証トークンを生成し、ユーザーごとに保存する
        auth_token = generate_auth_token()
        auth_tokens[username] = auth_token
        
        # ログイン成功
        return jsonify({'token': auth_token}), status_code
    else:
        # ログイン失敗
        return jsonify(response), status_code
    

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.json  # JSON データを取得
    
    # フォームデータから username と password を安全に取得する
    username = data.get('username')
    password = data.get('password')
    checkPassword = data.get('checkPassword')

    if password != checkPassword:
        return jsonify({'error': 'Passwords do not match.'}), 400

    # ユーザーの追加処理
    response, status_code = add_user(username, password)

    if status_code == 200:
        # ログイン成功時に認証トークンを生成し、ユーザーごとに保存する
        auth_token = generate_auth_token()
        auth_tokens[username] = auth_token
        
        return jsonify({'token': auth_token}), status_code
    else:
        return jsonify(response), status_code


@bp.route('/check_logging')
def check_logging():
    auth_token = request.headers.get('Authorization')  # Authorizationヘッダーからトークンを取得

    if auth_token:
        # 認証トークンがある場合、そのトークンがauth_tokensに存在するか確認
        username = None
        for user, token in auth_tokens.items():
            if token == auth_token:
                username = user
                break

        if username:
            # ログインしている場合の応答
            return jsonify({'user': username}), 200
        else:
            # 認証トークンが無効な場合の応答
            return jsonify({'error': 'Invalid authentication token.'}), 401
    else:
        # 認証トークンが提供されていない場合の応答
        return jsonify({'error': 'Authentication token is missing.'}), 401


@bp.route('/get_user_info', methods=['GET'])
def get_user_info():
    auth_token = request.headers.get('Authorization')  # Authorizationヘッダーからトークンを取得

    if auth_token:
        # 認証トークンがある場合、そのトークンがauth_tokensに存在するか確認
        username = None
        for user, token in auth_tokens.items():
            if token == auth_token:
                username = user
                break

        if username:
            # ユーザー情報を取得して返す
            user_info = {
                'username': username,
                # 他のユーザー情報を追加できる場合はここに追加する
            }
            return jsonify(user_info), 200
        else:
            # 認証トークンが無効な場合の応答
            return jsonify({'error': 'Invalid authentication token.'}), 401
    else:
        # 認証トークンが提供されていない場合の応答
        return jsonify({'error': 'Authentication token is missing.'}), 401
    

@bp.route('/logout', methods=['POST'])
def logout():
    auth_token = request.headers.get('Authorization')  # Authorizationヘッダーからトークンを取得
    print(auth_token)

    if auth_token:
        # 認証トークンがある場合、そのトークンがauth_tokensに存在するか確認
        username = None
        for user, token in auth_tokens.items():
            if token == auth_token:
                username = user
                break

        if username:
            # 認証トークンが存在する場合、ユーザーのセッションを削除する
            del auth_tokens[username]
            return jsonify({'message': 'User logged out successfully.'}), 200
        else:
            # 認証トークンが無効な場合の応答
            return jsonify({'error': 'Invalid authentication token.'}), 401
    else:
        # 認証トークンが提供されていない場合の応答
        return jsonify({'error': 'Authentication token is missing.'}), 401

