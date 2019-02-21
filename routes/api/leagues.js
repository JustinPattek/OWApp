const express = require('express');
const router = express.Router();

// League Model
const League = require('../../models/League');

// @route   GET api/leagues
// @desc    Get All Leagues
// @access  Public
router.get('/', (req, res) => {
    League.find()
    .sort({ date: -1 })
    .then(leagues => res.json(leagues));
});

// @route   POST api/leagues
// @desc    Create A League
// @access  Public
router.post('/', (req, res) => {
    const newLeague = new League({
        name: req.body.name,
        owner: req.body.owner
    });
    newLeague.save().then(league => res.json(league));
});

// @route   DELETE api/leagues/:id
// @desc    Delete A League
// @access  Public
router.delete('/:id', (req, res) => {
    League.findById(req.params.id)
    .then(league => (league.owner === req.body.owner)? league.remove().then(() => res.json({ success: true })) : res.status(404).json({ success: false }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;