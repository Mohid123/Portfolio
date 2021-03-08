const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Project = require('../models/Project');

//Login /blogpage

//GET request to /projects/add

router.get('/add', ensureAuth, (req, res) => {
	res.render('projects/add')
});


module.exports = router;