
const db = require('./DBHandler');

const Register = (req, res, pool, bcrypt, config) => {

	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		console.log('Name', username);
		console.log('Pass', password);
		console.log('email', email);
		return res.status(400).json({ errorMessage: "Unfilled form" });
	}

	/*	Check if input email or username already exists in the database	*/
	// const foundEmail = await db.CheckDuplicate(sql, config, 'email', email);
	// const foundUsername = await db.CheckDuplicate(sql, config, 'username', username);
	// if (foundEmail) {
	// 	return res.status(400).json({ errorMessage: "Email already exists" });
	// } else if (foundUsername) {
	// 	return res.status(400).json({ errorMessage: "Username already exists" });
	// } 

	db.CheckDuplicate(pool, config, 'email', email)
	.then(duplicateEmail => {
	    if (duplicateEmail) {
	        return res.status(400).json({ errorMessage: "Email already exists" });
	    }
	    else {
	        db.CheckDuplicate(pool, config, 'username', username)
	        .then(duplicateUsername => {
	            if (duplicateUsername) {
	                return res.status(400).json({ errorMessage: "Username already exists" });
	            }
	            else {
	                db.InsertNewUser(pool, config, req, bcrypt)
	                .then(success => {
	                	if (success !== -1) {
	                		res.status(200).json({ response: success });
	                	} else {
	                		res.status(400).json({ response: "Something went wrong" });
	                	}
	                })
	            }
	        })
	    }
	})

	/*	Begin inserting information from the new user into the database */
	// const insertNewUser = await db.InsertNewUser(sql, config, req, bcrypt);
	// if (insertNewUser) {
	// 	res.status(200).json({ errorMessage: "GOOD JOB FOLKS" });
	// } else {
	// 	res.status(400).json({ errorMessage: "BAD NEWS" });
	// }

}

module.exports = {
	Register: Register
}
