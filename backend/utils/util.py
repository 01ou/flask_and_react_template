"""
Gather commonly used functions for your project in this folder. 
You can reuse these functions whenever you need to implement similar functionality. 
This practice reduces repetition in your code and enhances its maintainability.
このフォルダには、プロジェクト全体でよく使われる関数をまとめます。
同じ機能を再度実装する必要がある場合に、これらの関数を再利用できます。
これにより、コードの重複が減り、保守性が向上します。
"""
import re, secrets

def validate_password(password):
    # 1. パスワードの長さが8文字以上であることを検証
    if len(password) < 8:
        return False, 'Password must be at least 8 characters long.', 400

    # 2. 使用できる文字の範囲を定義（英数字と一部の特殊文字）
    pattern = re.compile(r'^[A-Za-z0-9@#$%^&+=\-*]+$')
    
    # パスワードが指定されたパターンに一致するかどうかを検証
    if not pattern.match(password):
        return False, 'Please use only alphanumeric characters and @ # $ % ^ & + = - *', 400

    # 3. 英語大文字、英語小文字、数字、記号がすべて入っているかを検証
    has_upper = any(char.isupper() for char in password)
    has_lower = any(char.islower() for char in password)
    has_digit = any(char.isdigit() for char in password)
    has_symbol = any(char in '@#$%^&+=-*' for char in password)

    if not (has_upper and has_lower and has_digit and has_symbol):
        return False, 'Passwords must contain uppercase and lowercase letters, numbers, and symbols.', 400

    return True, None, 200

# トークンの生成に使用する安全な乱数生成器
token_generator = secrets.SystemRandom()
# 認証トークンの長さ（適宜変更可能）
TOKEN_LENGTH = 32
def generate_auth_token():
    # ランダムな文字列を生成してトークンとして返す
    return ''.join(token_generator.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for _ in range(TOKEN_LENGTH))
