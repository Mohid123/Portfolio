const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Project = require('../models/Project');

//Login /blogpage

//GET request to /blogpage

router.get('/', ensureGuest, (req, res) => {
	res.render('login')
});

//GET request to /blogpage

router.get('/dashboard', ensureAuth, (req, res) => {
	try {
		const projects = Project.find({user: req.user.id}).lean()
		res.render('dashboard', {
			name: req.user.firstName,
			projects
		})
	} catch (err) {
		console.error(err)
		res.render('error/500')
	}
});

module.exports = router;