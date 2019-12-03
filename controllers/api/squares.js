const express = require('express');
const router = express.Router();

const Square = require('../../models/Square.js')

// @route GET api/squares
// desc Get All squares
// access Public

router.get('/', (req, res) => {
  Square.find()
    // .sort date, alphabet, etc
    .then(squares => res.json(squares));
});

// @route POST api/squares
// desc Create a square
// access Public
router.post('/', (req, res) => {
  const newSquare = new Square({
    color: req.body.color,
    value: req.body.value,
    damage: req.body.damage,
    poison: req.body.poison
  });

  newSquare.save().then(square => res.json(square))
});

// @route DELETE api/squares/:id
// desc Delete a square
// access Public

router.delete('/:id', (req, res) => {
  Square.findById(req.params.id)
      .then((square) => square.remove().then(() => res.json({success:  true})))
      .catch((err) => res.status(404).json({success: false}))
});

module.exports = router;
