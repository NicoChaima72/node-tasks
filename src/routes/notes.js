const express = require("express");
const router = express.Router();

router.get("/notes", (req, res) => {
	res.send("Notes de la bd");
});

module.exports = router;
