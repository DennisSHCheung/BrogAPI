const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


const Register = require('./controllers/Register');
const LogIn = require('./controllers/LogIn');
const Blog = require('./controllers/Blog');

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

create table user_blog (
	id int identity(1,1) primary key,
	userid int,
	content text,
	title varchar(255),
	dateCreated datetime default current_timestamp
);

*/

const config = {
	user: 'dche192',
	password: 'Msaphase2',
	server: 'brogdb.database.windows.net',
	database: 'brogdb',
	port: 1433,
	options: {
		encrypt: true
	}
}

const sql = require('mssql');
const pool = new sql.ConnectionPool(config, error => {
	console.log(error, 'Database conneciton error');
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

/* APIs */
app.get('/', (req, res) => { res.send('Server is up and running') });

/* Handle new registration */
app.post('/register', (req, res) => { Register.Register(req, res, pool, bcrypt, config) });

/* Handle signin from users */
app.post('/login', (req, res) => { LogIn.LogIn(req, res, pool, bcrypt, config) });

/* Handle creations of new blog post */
app.post('./newPost', (req, res) => { Blog.NewPost(req, res, pool, bcrypt, config) });

/* Return all posts from user */
app.get('./getPosts', (req, res) => { Blog.getPosts(req, res, pool, bcrypt, config) });

app.listen(process.env.PORT || 10000, () => {
	console.log('Server is now listening');
});
