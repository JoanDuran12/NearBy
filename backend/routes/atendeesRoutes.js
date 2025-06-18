"use strict";

const express = require("express");
const { Atendees } = require("../models");
const router = express.Router();

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