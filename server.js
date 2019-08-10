const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


const Register = require('./controllers/Register');
/*const LogIn = require('./controllers/LogIn');
const NewPost = require('./controllers/NewPost');
*/

dotenv.config();

//process.env.DB_USER
//process.env.DB_PASSWORD

/*
create table user_details (
	id int identity(1,1) not null,
	email varchar(255),
	username varchar(255),
	userpassword varchar(255)
);

create table user_profile (
	id int not null,
	picture varchar(255),
	intro varchar(255),
);
*/

const db = knex({
	client: 'mssql',
	connection: {
		server: process.env.DB_HOST,
		user: "dche192",
		password: "Msaphase2",
		port: 1433,
		database: 'brogdb',
		encrypt: true
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

/* APIs */
app.get('/', (req, res) => { res.send('Server is up and running') });

/* Handle new registration */
app.post('/register', (req, res) => { Register.Register(req, res, db, bcrypt) });

/* Handle signin from users */
//app.post('/login', (req, res) => { login.LogIn(req, res, db, bcrypt) });

/* Handle creations of new blog post */
//app.post('./newPost', (req, res) => { newPost.NewPost(req, res, db) });

app.listen(process.env.PORT || 10000, () => {
	console.log('Server is now listening');
});