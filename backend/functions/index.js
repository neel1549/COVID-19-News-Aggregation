const functions = require("firebase-functions");
const californiaData = require("./locationData");
const axios = require("axios");
const express = require("express");
var cors = require("cors");
const key = require("./api_keys/keys");

const app = express();

app.use(cors());

async function restDetails(data) {
  return Promise.all(
    data.map((restaurant) => {
      return axios
        .get("https://maps.googleapis.com/maps/api/place/details/json", {
          params: {
            key: key.keys.placesKey,
            place_id: restaurant.place_id,
          },
        })
        .then((response) => {
          const returnArray = [
            response.data.result.formatted_address,
            response.data.result.formatted_phone_number,
            response.data.result.opening_hours,
            response.data.result.website,
          ];

          return returnArray;
        });
    })
  );
}

async function parseJSON(data) {
  return new Promise((resolve, reject) => {
    let names = [];
    let images = [];
    let details = [];

    restDetails(data).then((response) => {
      details = response;
      for (var i = 0; i < data.length; i++) {
        const restaurant = data[i];
        names.push(restaurant.name);
        const ref = restaurant.photos[0].photo_reference;

        images.push(
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight&photoreference=" +
            ref +
            "&key=" +
            key.keys.placesKey
        );
      }
      resolve({ names: names, images: images, details: details });
    });
  });
}

app.get("/restaurants", async (req, res) => {
  const county = req.query.county;

  let results = [];

  axios
    .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
      params: {
        key: key.keys.placesKey,
        location: californiaData.californiaData[county],
        radius: 30000,
        keyword: "restaurant",
        opennow: true,
      },
    })
    .then((response) => {
      parseJSON(response.data.results.slice(0, 10)).then((finalData) => {
        res.json(finalData);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });

  // Respond with the restaurant json
});

async function renderTestingCenters(testingCenters) {
  return new Promise((resolve, reject) => {
    geocode(testingCenters).then((loc) => {
      const finalLoc = [];

      loc.forEach((loc) => {
        finalLoc.push([loc.lng, loc.lat]);
      });
      resolve(finalLoc);
    });
  });
}
async function geocode(testingCenters) {
  let area = [];

  return Promise.all(
    testingCenters.map((center) => {
      return axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            key: key.keys.placesKey,
            address:
              center.physical_address[0].address_1 +
              " " +
              center.physical_address[0].city +
              " " +
              center.physical_address[0].state_province,
          },
        })
        .then((geometries) => {
          return geometries.data.results[0].geometry.location;
        })
        .catch((error) => console.log(error));
    })
  );
}

app.get("/testing", async (req, res) => {
  axios
    .get(
      "https://covid-19-testing.github.io/locations/california/complete.json"
    )
    .then((response) => {
      const testingDetails = response.data;
      renderTestingCenters(response.data).then((locations) => {
        res.json({ centers: locations, centerDetails: testingDetails });
      });
    });
});

exports.app = functions.https.onRequest(app);
