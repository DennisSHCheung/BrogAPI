const db = require('./DBHandler');

const NewPost = (req, res, pool, bcrypt, config) => {

	const { id, username, password, title, content } = req.body;
	if (!username || !password) {
		return res.status(400).json({ errorMessage: "Incorrect username or password!" });
	} 

	db.ValidateUser(pool, config, bcrypt, username, password)
	.then(result => {
		if (result !== false) {
			db.CreateNewPost(pool, config, bcrypt, req)
			.then(success => {
				if (success) {
					res.status(200).json({ response: "good" });
				} else {
					res.status(400).json({ response: "failed "});
				}
			})
		} else {
			res.status(400).json({ response: "Incorrect credentials" });
		}
	})

	

}

const GetPosts = (req, res, pool, config) => {

	const id = req.query.id;
	if (!id) {
		res.status(400).json({ response: "Empty id" });
	}

	db.getAllPosts(pool, config, id)
	.then(result => {
		if (result === "empty") {
			res.status(200).json({ response: "empty" });
		} else if (result !== false) {
			res.status(200).json({ response: result });
		} else {
			res.status(400).json({ response: "error" });
		}
	});

}

module.exports = {
	NewPost: NewPost,
	GetPosts: GetPosts
}
