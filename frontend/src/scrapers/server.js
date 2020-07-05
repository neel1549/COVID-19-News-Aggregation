const californiaData = require("./locationData");
const puppeteer = require("puppeteer");
const axios = require("axios");
const express = require("express");
var cors = require("cors");
const scrape = require("./restaurantScraper");

const app = express();

app.use(cors());

async function parseJSON(data) {
  let names = [];
  let images = [];
  let details = [];
  console.log("hello");
  console.log(data.length);
  for (var i = 0; i < data.length; i++) {
    const restaurant = data[i];
    names.push(restaurant.name);
    const ref = restaurant.photos[0].photo_reference;
    images.push(
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight&photoreference=" +
        ref +
        "&key=AIzaSyB15JFNKk2fR-Ox1GJctMVMYENgdfb_bFg"
    );

    details.push(
      await scrape.scrape(restaurant.vicinity + " " + restaurant.name + " open")
    );
  }
  return { names: names, images: images, details: details };
}

app.get("/restaurants", async (req, res) => {
  const county = req.query.county;
  let results = [];
  console.log(californiaData.californiaData[county]);
  axios
    .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
      params: {
        key: "AIzaSyB15JFNKk2fR-Ox1GJctMVMYENgdfb_bFg",
        location: californiaData.californiaData[county],
        radius: 30000,
        keyword: "restaurant",
        opennow: true,
      },
    })
    .then((response) => {
      parseJSON(response.data.results.slice(0, 10)).then((finalData) => {
        console.log(finalData);
        res.json(finalData);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });

  // Respond with the restaurant json
});

app.listen(4001);
