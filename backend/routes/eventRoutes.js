"use strict";

const express = require("express");
const { Event } = require("../models");
const { Atendees } = require("../models/atendees");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "../", "public", "events")); // Use absolute path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Create new Event
router.post("/", upload.single("eventPic"), async (req, res) => {
  try {
    const eventData = { ...req.body };
    if (req.file) {
      eventData.eventPic = req.file.filename; // Only store the filename string
    }
    const event = await Event.create(eventData);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all the events
router.get("/", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
