const functions = require("firebase-functions");
const express = require("express");
const scrape = require("./restaurantScraper");

const app = express();
var cors = require("cors");
app.use(cors());
app.get("/restaurants", async (req, res) => {
  const result = await scrape.scrape(
    "restaurants near " + req.query.county + " county open"
  );

  // Respond with the restaurant json
  res.json(result);
});
exports.app = functions.https.onRequest(app);
