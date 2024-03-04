# api/index.py
from flask import Blueprint

bp = Blueprint('index', __name__)

@bp.route('/')
def index():
    return '<h1>Hello Flask!</h1>'
