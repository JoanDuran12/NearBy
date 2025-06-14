const express = require('express');
const { Event } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

module.exports = router;
