"use strict";

const express = require("express");
const { Atendees } = require("../models");
const router = express.Router();

// Get to know if user is host
router.get("/", async (req, res) => {
  const events = await Atendees.findAll();
  res.json(events);
});

// Get a specific registration log
router.get("/:firebaseUid/:eventId", async (req, res) => {
  try {
    const { firebaseUid, eventId } = req.params;
    const event = await Atendees.findOne({
      where: {
        firebaseUid,
        eventId,
      },
    });

    if (!event) {
      return res.status(404).json({
        error: "There is not log of user registration to the given event",
      });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign User to event
router.post("/", async (req, res) => {
  try {
    const atendees = await Atendees.create(req.body);
    console.log(req.body);
    res.json(atendees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific event registration by firebaseUid and eventId
router.delete("/:firebaseUid/:eventId", async (req, res) => {
  try {
    const { firebaseUid, eventId } = req.params;

    const deletedCount = await Atendees.destroy({
      where: { firebaseUid, eventId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "User not found for this event" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
