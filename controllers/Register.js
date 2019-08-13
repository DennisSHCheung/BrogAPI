
const db = require('./DBHandler');

const Register = (req, res, pool, bcrypt, config) => {

	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ errorMessage: "Unfilled form" });
	}

	/*	Check if input email or username already exists in the database	*/
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
	            	/*	Begin inserting information from the new user into the database */
	                db.InsertNewUser(pool, config, req, bcrypt)
	                .then(success => {
	                	if (success !== false) {
	                		res.status(200).json({ response: success });
	                	} else {
	                		res.status(400).json({ response: "Something went wrong" });
	                	}
	                })
	            }
	        })
	    }
	})

}

module.exports = {
	Register: Register
}
