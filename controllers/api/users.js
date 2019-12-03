const express = require('express');
const router = express.Router();

const User = require('../../models/User.js')

// @route GET api/users
// desc Get All user
// access Public

router.get('/', (req, res) => {
  User.find()
    // .sort date, alphabet, etc
    .then(users => res.json(users));
});

// @route POST api/users
// desc Create a user
// access Public
router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });

  newUser.save().then(user => res.json(user))
});

// @route DELETE api/users/:id
// desc Delete a user
// access Public

router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
      .then((user) => user.remove().then(() => res.json({success:  true})))
      .catch((err) => res.status(404).json({success: false}))
});

module.exports = router;
