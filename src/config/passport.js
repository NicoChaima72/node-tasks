const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/User");

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			const user = await User.findOne({ email: email });
			if (!user) {
				// done(error, return usuario, mensaje)
				return done(null, false, { message: "User not found" });
			} else {
				const match = await user.matchPassword(password);
				if (match) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Password incorrect" });
				}
			}
		}
	)
);

// si se loguea se almacena en sesion
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// utilizar los datos de la sesion
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
