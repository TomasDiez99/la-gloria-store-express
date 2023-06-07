const express = require('express');
const router = express.Router();

const supabase = require('../config/database.js');

router.get("/clients", async (req, res) => {
  try {
    const { data, error } = await supabase.from("clients").select("*");

    if (error) {
      throw new Error(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has ocurred when getting the clients" });
  }
});

module.exports = router;