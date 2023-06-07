const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/rest", routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Live at http://localhost:${PORT}`);
});

module.exports = app;
