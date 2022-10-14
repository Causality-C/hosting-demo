// Loads environment variables
const express = require("express");
require("dotenv").config();
// Heroku will automatically have its own port
const port = process.env.PORT || 4000;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Create an API Route: should be available on -> localhost:5000/hello
app.get("/hello", (req, res) => {
  res.json({ msg: "Testing, sending hello" });
});

// Serve Frontend
const path = require("path");
app.use("/", express.static(path.resolve(__dirname, "my-app/build")));

// Make sure this is last or else api will call not be able to call /hello
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "my-app/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
