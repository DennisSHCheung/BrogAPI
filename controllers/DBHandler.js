/*	Check if input email or username exists in the database 
	type can be either email or username
*/
const CheckDuplicate = (pool, config, type, data) => {

	return new Promise((resolve, reject) => {
		pool.request()
		.query(`select ${type} from user_details where ${type} = '${data}'`)
		.then(result => {
			if (result.rowsAffected[0] === 0) {
				resolve(false);
			}
			resolve(true);
		})
		.catch(e => {
			console.log(e);
			console.log("Failed to check");
			resolve(false);
		})
	})

}

const InsertNewUser = (pool, config, req, bcrypt) => {
	const { email, username, password } = req.body;
	const hash = bcrypt.hashSync(password);

	return new Promise((resolve, reject) => {
		pool.request()
		.query(`insert into user_details (email, username, userpassword) values ('${email}', '${username}', '${hash}')`)
		.then(result => {
			resolve(getUserDetails(pool, config, username));
		})
		.catch(e => {
			console.log(e);
			resolve(false);
		})
	})
		

}

const getUserDetails = (pool, config, username) => {

	return new Promise((resolve, reject) => {
		pool.request()
		.query(`select * from user_details where username = '${username}'`)
		.then(result => {
			resolve(result.recordset);
		})
		.catch(e => {
			resolve(-1);
		})
	})
	
}

const ValidateUser = (pool, config, bcrypt, username, password) => {
	
	return new Promise((resolve, reject) => {
		pool.request()
		.query(`select * from user_details where username = '${username}'`)
		.then(result => {
			if (result.rowsAffected[0] === 0) {
				resolve(false);
			} else {
				const correctPassword = bcrypt.compareSync(password, result.recordset[0].userpassword, 
					(err, res) => {
						return res;
				});
				
				if (correctPassword) {
					resolve(result.recordset);
				} else {
					resolve(false);
				}				
			}
		})
	})

}

const CreateNewPost = (pool, config, bcrypt, req) => {
	const { id, title, content } = req.body;

	return new Promise((resolve, reject) => {
		pool.request()
		.query(`insert into user_blog (userid, content, title) values ('${id}', '${content}', '${title}')`)
		.then(result => {
			resolve(true);
		})
		.catch(e => {
			console.log(e);
			console.log("failed to insert a new post");
			resolve(false);
		})
	})

}

const getAllPosts = (pool, config, userid) => {

	return new Promise((resolve, reject) => {
		pool.request()
		.query(`select * from user_blog where userid = '${userid}' order by id desc`)
		.then(result => {
			if (result.rowsAffected[0] === 0) {
				resolve("empty");
			}
			resolve(result.recordset);
		})
		.catch(e => {
			resolve(false);
		})
	})

}

module.exports = {
	CheckDuplicate: CheckDuplicate,
	InsertNewUser: InsertNewUser,
	ValidateUser: ValidateUser,
	getAllPosts: getAllPosts,
	CreateNewPost: CreateNewPost
}
