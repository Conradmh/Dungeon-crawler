const express = require('express');
const router = express.Router();

const Dungeon = require('../../models/Dungeon.js')

// @route GET api/dungeons
// desc Get All dungeons
// access Public

router.get('/', (req, res) => {
  Dungeon.find()
    // .sort date, alphabet, etc
    .then(dungeons => res.json(dungeons));
});

// @route POST api/dungeons
// desc Create a dungeon
// access Public
router.post('/', (req, res) => {
  const newDungeon = new Dungeon({
    name: req.body.name,
    difficulty: req.body.difficulty,
    monsters: req.body.monsters,
    boss: req.body.boss,
    completed: req.body.completed
  });

  newDungeon.save().then(dungeon => res.json(dungeon))
});

// @route Update api/dungeons/:id
// desc Update a dungeon
// access Public
router.put('/:id', (req, res) => {
  console.log(req.params.id, "we made it");
  Dungeon.findById(req.params.id)
    .then((dungeon) => {
      // get the boss based on id
      dungeon.name = req.body.name,
      dungeon.difficulty = req.body.difficulty,
      dungeon.monsters = req.body.monsters,
      dungeon.boss = req.body.boss,
      dungeon.completed = req.body.completed
      dungeon.save()
    })
    .then(() => res.json({success: true}))
    .catch(err => res.status(500).json({success: false}))
})

// @route DELETE api/dungeons/:id
// desc Delete a dungeon
// access Public

router.delete('/:id', (req, res) => {
  Dungeon.findById(req.params.id)
      .then((dungeon) => dungeon.remove().then(() => res.status(201).json({success:  true})))
      .catch((err) => { console.log(err); res.status(500).json(err)})
});

module.exports = router;
