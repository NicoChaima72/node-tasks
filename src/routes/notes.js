const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

router.get("/notes", isAuthenticated, async (req, res) => {
	console.log(req.user);
	const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
	res.render("notes/all-notes", { notes, active: { notes_index: true } });
});
router.get("/notes/add", isAuthenticated, (req, res) => {
	res.render("notes/new-note", { active: { notes_create: true } });
});

router.post("/notes/new-note", isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	const errors = [];

	if (!title) errors.push({ text: "Title is required" });
	if (!description) errors.push({ text: "Description is required" });

	if (errors.length > 0)
		res.render("notes/new-note", { errors, title, description });
	else {
		const newNote = new Note({ title, description });
		newNote.user = req.user.id;
		await newNote.save();
		req.flash("success_msg", "Note added successfully.");
		res.redirect("/notes");
	}
});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
	const id = req.params.id;
	const note = await Note.findById(id);
	res.render("notes/edit-note", { note, active: { notes_edit: true } });
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	req.flash("success_msg", "Note updated successfully.");
	res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
	const id = req.params.id;
	await Note.findByIdAndDelete(id);
	req.flash("success_msg", "Note deleted successfully.");
	res.redirect("/notes");
});

module.exports = router;
