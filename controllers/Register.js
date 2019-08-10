const Register = (req, res, db, bcrypt) => {

	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ errorMessage: "Unfilled form" });
	}

	db.select().from()
	.



}

module.exports = {
	Register: Register
}
