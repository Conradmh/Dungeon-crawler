const express = require('express');
const router = express.Router();
const Character = require('../../models/Character.js');



// @route GET api/characters
// desc Get All characters
// access Public

router.get('/', (req, res) => {
  Character.find()
    // .sort date, alphabet, etc
    .then(characters => res.json(characters));
});

// @route POST api/characters
// desc Create a character
// access Public
router.post('/', (req, res) => {
  const newCharacter = new Character({
    name: req.body.name,
    classType: req.body.classType,
    health: req.body.health,
    physAtk: req.body.physAtk,
    magPwr: req.body.magPwr,
    level: req.body.level,
    users: req.body.users
  });

  newCharacter.save().then(character => res.json(character))
});

// @route DELETE api/characters/:id
// desc Delete a character
// access Public

router.delete('/:id', (req, res) => {
  Character.findById(req.params.id)
      .then((character) => character.remove().then(() => res.json({success:  true})))
      .catch((err) => res.status(404).json({success: false}))
});

module.exports = router;
