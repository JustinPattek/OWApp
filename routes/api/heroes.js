const express = require('express');
const router = express.Router();

// Hero Model
const Hero = require('../../models/Hero');

// @route   GET api/heroes
// @desc    Get All heroes
// @access  Public
router.get('/', (req, res) => {
    Hero.find()
    .sort({ hero : 1})
    .then(heroes => res.json(heroes));
});

// @route   GET api/heroes
// @desc    Get One hero
// @access  Public
router.get('/:hero', (req, res) => {
    Hero.find({hero : req.params.hero})
    .then(heroes => res.json(heroes));
});

module.exports = router;