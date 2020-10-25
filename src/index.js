require("./config/config");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

// initializations
const app = express();
require("./database");

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

// global variables

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
