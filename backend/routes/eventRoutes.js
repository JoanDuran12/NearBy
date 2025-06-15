const express = require('express');
const { Event } = require('../models');
const router = express.Router();

// Create new Event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all the events
router.get('/', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

module.exports = router;
