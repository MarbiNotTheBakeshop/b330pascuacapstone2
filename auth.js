const jwt = require("jsonwebtoken");

const secret = "CoffeeFlavorAPI";

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
};

module.exports.verify = (request, response, next) => {
	let token = request.headers.authorization;
	

	if(token === undefined){
		return response.send("No token provided!")
	}else{
		token = token.slice(7, token.length);
		

		jwt.verify(token, secret, (err, decodedToken) => {
			if(err){
				return response.send({
					auth: "Failed",
					message: err.message
				})
			}else{
				console.log(decodedToken);

				request.user = decodedToken;
				console.log(request);
				next();
			}
		})

	}
};

module.exports.verifyAdmin = (request, response, next) => {

	if(request.user.isAdmin){
		next();
	}else{
		return response.send({
			auth: "Failed",
			message: "Action Forbidden, contact admin!"
		})
	}
};
