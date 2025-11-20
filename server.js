const express = require("express");
const path = require("path");
const app = express();
 
// Serve all static files
app.use(express.static(__dirname));
 
// Route for home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
 
// Optional extra routes
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});
 
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});
 
// Azure uses PORT env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 
