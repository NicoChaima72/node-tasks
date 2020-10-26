const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error_msg", "Not authorized");
		res.redirect("/users/signin");
	}
};

helpers.verifyNotAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error_msg", "You are authenticated");
		res.redirect("/notes");
	}
};

module.exports = helpers;
