const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/User");

router.get("/users/signin", (req, res) => {
	res.render("users/signin", { active: { users_signin: true } });
});

router.post(
	"/users/signin",
	passport.authenticate("local", {
		successRedirect: "/notes",
		failureRedirect: "/users/signin",
		failureFlash: true,
	})
);

router.get("/users/signup", (req, res) => {
	res.render("users/signup", { active: { users_signup: true } });
});

router.post("/users/signup", async (req, res) => {
	const { name, email, password, password_confirm } = req.body;
	const errors = [];
	if (name.length <= 0) {
		errors.push({ text: "Name is required" });
	}
	if (password != password_confirm) {
		errors.push({ text: "Password do not match" });
	}
	if (password.length < 4) {
		errors.push({ text: "Password must be at least 4 characters" });
	}

	if (errors.length > 0) {
		res.render("users/signup", { errors, name, email });
	} else {
		const emailUser = await User.findOne({ email: email });
		if (emailUser) {
			req.flash("error_msg", "The email is already in use");
			res.redirect("/users/signup");
		}
		const newUser = new User({ name, email, password });
		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();
		req.flash("success_msg", "You are register");
		res.redirect("/users/signin");
	}
});

router.post("/users/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
