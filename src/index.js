require("./config/config");

const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const flash = require("connect-flash");
const passport = require("passport");

// initializations
const app = express();
require("./database");
require("./config/passport");

// settings
app.set("port", process.env.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
	".hbs",
	exphbs({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "layouts"),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
		handlebars: allowInsecurePrototypeAccess(Handlebars), //Permitir recorrer objetos de la bd en las vistas
	})
);
app.set("view engine", ".hbs");

// middlewares
app.use(express.urlencoded({ extended: false })); //recibir datos de formularios
app.use(methodOverride("_method")); //podemos enviar form con metodos put | delete con el input hidden _method
app.use(
	session({
		secret: "mysecretapp",
		resave: true,
		saveUninitialized: true,
	})
); //guardar datos del usuario en una sesion
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Para enviar mensajes que se borran al recargar la pagina

// global variables
// mensajes
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error"); //passport
	res.locals.user = req.user || null;
	next();
});

// routes
app.use(require("./routes/routes"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// listen server
app.listen(app.get("port"), () => {
	console.log("Server run in port ", app.get("port"));
});
