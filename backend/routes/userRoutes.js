const express = require("express");
const { User } = require("../models");
const router = express.Router();

// Create a New User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all the User
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
router.get("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const user = await User.findOne({ where: { firebaseUid } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific user
router.put("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const [updatedCount, updatedUsers] = await User.update(req.body, {
      where: { firebaseUid },
      returning: true,
    });

    if (updatedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: updatedUsers[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific user
router.delete("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const deletedCount = await User.destroy({
      where: { firebaseUid },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
