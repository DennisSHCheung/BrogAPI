const Register = (req, res, db, bcrypt) => {

	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		console.log('Name', username);
		console.log('Pass', password);
		console.log('email', email);
		return res.status(400).json({ errorMessage: "Unfilled form" });
	}

	db.select('email').from('user_details')
	.where('email', '=', email)
	.then(data => {
		if (data != "") {
			// if (data[0].email) {

			// }
			res.status(400).json({ errorMessage: "email already exists in the db" });
		} else {
			const hashedPw = bcrypt.hashSync(password);

			db.transaction(trx => {
				trx.insert({
					email: email,
					username: username,
					userpassword: password
				})
				.into('user_details')
				.returning('id')
				.then(id => {
					return trx('user_profile')
					.returning('*')
					.insert({
						id: id[0],
						picture: 'https://i.imgur.com/FSgbIi4.png',
						intro: 'None'
					})
					.then(user => {
						return res.status(200).json({ errorMessage: "yes" });
					})
				})
				.then(trx.commit)
				.catch(trx.rollback)
			})
			.catch(e => {
				res.json({ errorMessage: e });
			})
		}
	});



}

module.exports = {
	Register: Register
}
