const db = require('./DBHandler');

/*	Verify user's credentials */
const LogIn = (req, res, sql, bcrypt, config) => {

	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ errorMessage: "Missing username or password" });
	}

	db.ValidateUser(sql, config, bcrypt, username, password)
	.then(user => {
		if (user != -1) {
			res.status(200).json({ response: user });
		} else {
			res.status(400).json({ response: "Incorrect credentials" });
		}
	})

}

module.exports = {
	LogIn: LogIn
}
