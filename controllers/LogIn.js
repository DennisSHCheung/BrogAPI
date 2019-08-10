const LogIn = (req, res, db, bcrypt) => {

	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).json({ errorMessage: "Incorrect username or password!" });
	}

	db.select()

}

module.exports = {
	LogIn: LogIn
}
