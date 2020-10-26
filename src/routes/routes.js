const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", { active: { pages_home: true } });
});

router.get("/about", (req, res) => {
	res.render("about", { active: { pages_about: true } });
});

module.exports = router;
