const express = require("express");
const app = express();
const fs = require("fs");
const qs = require("querystring");

app.use((req, res, next) => {
  console.log(req.ip);
  console.log(new Date());
  console.log(req.url);
  console.log(req.protocol);
  console.log(req.method);
  console.log(req.hostname);
  const details = {
  Method: req.method,
  URL: req.url,
  IP: req.ip,
  Time: new Date(),
  Protocol: req.protocol,
  Hostname: req.hostname,
  };
  fs.appendFile("serverData.json", JSON.stringify(details) + "\n", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Request details logged");
    }
  });


  next();
});

app.get("/", (req, res) => {
  res.send("home");
});
app.get("/about", (req, res) => {
  res.send("About us");
});

app.listen(3000, (req, res) => {
  console.log("Server running at 3000");
});
