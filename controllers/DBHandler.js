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
			console.log("Failed to check email");
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
			.query(`select userpassword from user_details where username = '${username}'`)
			.then(result => {
				sql.close();
				if (result.rowsAffected[0] === 0) {
					return false;
				} else {
					return (
						bcrypt.compareSync(password, result.recordset[0].userpassword, (err, res) => {
							return res;
						})
					)
				}
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
