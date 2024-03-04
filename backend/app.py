# app.py

from . import create_app
from . import db, migrate

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
