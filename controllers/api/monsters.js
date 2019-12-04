const express = require('express');
const router = express.Router();

const Monster = require('../../models/Monster.js')

// @route GET api/monsters
// desc Get All monsters
// access Public

router.get('/', (req, res) => {
  Monster.find()
    // .sort date, alphabet, etc
    .then(monsters => res.json(monsters));
});

// @route POST api/monsters
// desc Create a monster
// access Public
router.post('/', (req, res) => {
  const newMonster = new Monster({
    name: req.body.name,
    level: req.body.level,
    children: req.body.children,
    xp: req.body.xp,
    boss: req.body.boss
  });

  newMonster.save().then(monster => res.json(monster))
});

// @route DELETE api/monsters/:id
// desc Delete a monster
// access Public

router.delete('/:id', (req, res) => {
  Monster.findById(req.params.id)
      .then((monster) => monster.remove().then(() => res.json({success:  true})))
      .catch((err) => res.status(404).json({success: false}))
});

module.exports = router;
