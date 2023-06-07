const express = require("express");
const router = express.Router();

const supabase = require("../config/database.js");

const PAGE_SIZE = 9;

router.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const pageNumber = parseInt(page) || 1; // use page 1 as default

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .range((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE - 1);

    if (error) {
      throw new Error(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has occurred when getting the clients" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Received request to create a client with email:", email);

    const validationError = validateClient(email);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const insertData = [{ email }];

    console.log("Data to insert:", insertData);

    const { data, error } = await supabase.from("clients").insert(insertData);

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json({ message: "Client created successfully", data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error has occurred when creating the client" });
  }
});

function validateClient(email) {
  if (!email) {
    return "Email was not given in the request body";
  }

  if (!validateEmailFormat(email)) {
    return "Invalid email format";
  }

  return null;
}

function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

router.get("/create", async (req, res) => {
  try {
    const clientFields = {
      email: {
        type: "email",
        label: "Email",
        required: true,
      },
    };

    res.json({ fields: clientFields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error has occurred" });
  }
});

module.exports = router;
