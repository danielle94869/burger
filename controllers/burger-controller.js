const router = require('express').Router()
const burger = require('../models/burger.js')

// Get all groceries
router.get('/burgers', (req, res) => {
  burger.getAll(burgers => {
    res.json(burgers)
  })
})

// Create one grocery
router.post('/burgers', (req, res) => {
  burger.createOne(req.body, id => {
    res.json({ id })
  })
})

// Update one grocery
router.put('/burgers/:id', (req, res) => {
  burger.updateOne(req.body, { id: req.params.id }, () => {
    res.sendStatus(200)
  })
})

// Delete one grocery
router.delete('/burgers/:id', (req, res) => {
  burger.deleteOne({ id: req.params.id }, () => {
    res.sendStatus(200)
  })
})

module.exports = router
