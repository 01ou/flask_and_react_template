# flask_and_react_template

## command
npx create-react-app frontend


# frontend
Move the contents of 「for_frontend」 to 「frontend」.
and replace them.

## replacement
Move the contents of 「for_frontend」 to 「frontend」.
Move 「index.html」 to 「frontend/public」.
and replace them.

## install
npm install react-router-dom
npm install tailwindcss
npm install url-loader --save-dev

## command
npx tailwindcss init
npx webpack
    yes


# backend
## install
pip install flask-cors

## command
flask db init

flask db migrate -m ""
flask db upgrade
