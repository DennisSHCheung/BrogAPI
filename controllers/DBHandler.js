/*	Check if input email or username exists in the database 
	type can be either email or username
*/
const CheckDuplicate = (sql, config, type, data) => {

	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`select ${type} from user_details where ${type} = '${data}'`)
			.then(result => {
				sql.close();
				if (result.rowsAffected[0] === 0) {
					return false;
				}
				return true;
			})
		)
		})
		.catch(e => {
			console.log("Failed to check");
			sql.close();
			return false;
		})
	return result;
}

const InsertNewUser = (sql, config, req, bcrypt) => {
	const { email, username, password } = req.body;
	const hash = bcrypt.hashSync(password);
	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`insert into user_details (email, username, userpassword) values ('${email}', '${username}', '${hash}')`)
			.then(result => {
				sql.close();
				return true;
			})
		)
		})
		.catch(e => {
			console.log(e);
			console.log("Failed to create new user");
			return false;
		});
	return result;
}

const ValidateUser = (sql, config, bcrypt, username, password) => {
	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`select * from user_details where username = '${username}'`)
			.then(result => {
				sql.close();
				if (result.rowsAffected[0] === 0) {
					return -1;
				} else {
					const correctPassword = bcrypt.compareSync(password, result.recordset[0].userpassword, 
						(err, res) => {
							return res;
					});
					
					if (correctPassword) {
						return result.recordset;
					}
					return -1;
				}
			})
		)
	});
	return result;
}

const CreateNewPost = (sql, config, bcrypt, userid, password, req) => {
	const { title, content } = req.body;
	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`insert into userblog (userid, content, title) values ('${userid}', '${content}', '${title}')`)
			.then(result => {
				sql.close();
				return true;
			})
			.catch(e => {
				console.log("failed to insert a new post");
				return false;
			})
		)
	});
	return result;	
}

const getAllPosts = (sql, config, userid) => {
	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`select * from user_blog where id = '${userid}'`)
			.then(result => {
				sql.close();
				if (result.rowsAffected[0] === 0) {
					console.log("NO user");
					return false;
				}
				return result;
			})
			.catch(e => {
				console.log("Error getting posts from user");
			})
		)
	});
	return result;
}

const deletePost = (sql, config, userid, postid) => {
	const result = sql.connect(config).then(pool => {
		return (
			pool.request()
			.query(`delete from user_blog where id = '${postid}'`)
			.then(result => {
				if (result.rowsAffected[0] === 0) {
					console.log("Post not found!");
					return false;
				}
				return true;
			})
		)
	});
	return result;
}

module.exports = {
	CheckDuplicate: CheckDuplicate,
	InsertNewUser: InsertNewUser,
	ValidateUser: ValidateUser
}
