# MyBookList 📚
A web app inspired from MyAnimeList. Use this to create a list of the books that you have read or planning to read.
Implemented using Node.js, React.js, Express.js, MySQL and Firebase. 

## Demo
![image](https://github.com/Syrux64/mybooklist-web-app/assets/118998822/a988c071-9fd5-421d-a17c-ab0a6de9fdbf)

## Requirements to build
- Node.js
- Firebase project
- MySQL server

## To build
#### Clone the repo
```bash
git clone https://github.com/Syrux64/mybooklist-web-app.git
cd mybooklist-web-app
```
#### Install the required modules
```bash
npm install exp	ress nodemon mysql dotenv firebase cors axios lodash path

cd my-book-list && npm install && npm install react-router-dom
```
In the root directory, do the following to start the server
```bash
nodemon index.js
```
In the my-book-list directory, do the following to build
```bash
npm run build
```
## Environment variables
.env file in the root directory for MySQL db and API key of google books
```env
PORT=port
API_KEY_BOOKS=api_key_for_google_books

# Database
DB_HOST=host
DB_USER=user
DB_PASSWORD=password
DB_NAME=name
```
.env file in the my-book-list directory for firebase
```env
VITE_FIREBASE_API_KEY=api_key
VITE_FIREBASE_AUTH_DOMAIN=auth-auth_domain
VITE_FIREBASE_PROJECT_ID=auth-project_id
VITE_FIREBASE_STORAGE_BUCKET=storage_bucket
VITE_FIREBASE_MESSAGEING_SENDER_ID=messaging_sender_id
VITE_FIREBASE_APP_ID=app_id
VITE_FIREBASE_MEASUREMENT_ID=measurement_id
```

