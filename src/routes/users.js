const express = require("express");
const router = express.Router();

router.get("/users/signin", (req, res) => {
	res.send("Ingresando a la aplicacion");
});

router.get("/users/signup", (req, res) => {
	res.send("Registrandose en la aplicacion");
});

module.exports = router;
