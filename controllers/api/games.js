const express = require('express');
const router = express.Router();

const Game = require('../../models/Game.js')

// @route GET api/games
// desc Get All games
// access Public

router.get('/', (req, res) => {
  Game.find()
    // .sort date, alphabet, etc
    .then(games => res.json(games));
});

// @route POST api/games
// desc Create a game
// access Public
router.post('/', (req, res) => {
  const newGame = new Game({
    name: req.body.name,
  //  player: req.body.player,
    charArray: req.body.characters,
  //  dungeon: req.body.dungeon
  });

  newGame.save().then(game => res.json(game))
});

// @route DELETE api/games/:id
// desc Delete a game
// access Public

router.delete('/:id', (req, res) => {
  Game.findById(req.params.id)
      .then((game) => game.remove().then(() => res.json({success:  true})))
      .catch((err) => res.status(404).json({success: false}))
});

module.exports = router;
