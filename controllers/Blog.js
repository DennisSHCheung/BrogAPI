const NewPost = (req, res, sql, bcrypt, config) => {

	const { id, username, password, title, content } = req.body;
	if (!username || !password) {
		res.status(400).json({ errorMessage: "Incorrect username or password!" });
	} 

	

}

const GetPosts = (req, res, sql, bcrypt, config) => {


}

module.exports = {
	NewPost: NewPost,
	GetPosts: GetPosts
}
