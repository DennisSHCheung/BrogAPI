const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

/*
const Register = require('./controllers/Register');
const LogIn = require('./controllers/LogIn');
const NewPost = require('./controllers/NewPost');
*/

dotenv.config();

const db = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

/* APIs */
app.get('/', (req, res) => { res.send('Server is up and running') });

/* Handle new registration */
//app.post('/register', (req, res) => { register.Register(req, res, db, bcrypt) });

/* Handle signin from users */
//app.post('/login', (req, res) => { login.LogIn(req, res, db, bcrypt) });

/* Handle creations of new blog post */
//app.post('./newPost', (req, res) => { newPost.NewPost(req, res, db) });

app.listen(process.env.PORT || 10000, () => {
	console.log('Server is now listening');
});