const NewPost = (req, res, db) => {

	const { username, password, title, content } = req.body;
	if (!username || !password) {
		res.status(400).json({ errorMessage: "Incorrect username or password!" });
	} 

	

}

module.exports = {
	NewPost: NewPost
}
