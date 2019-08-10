const db = require('./DBHandler');

/*	*/
async function LogIn(req, res, sql, bcrypt, config) {

	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ errorMessage: "Missing username or password" });
	}

	const isInputCorrect = await db.ValidateUser(sql, config, bcrypt, username, password);
	if (isInputCorrect) {
		res.status(200).json({ errorMessage: "Welcome" });
	} else {
		res.status(400).json({ errorMessage: "WRONG!" });
	}

}

module.exports = {
	LogIn: LogIn
}
