const puppeteer = require('puppeteer');
const express = require('express');
var cors = require('cors')
const scrape = require('./restaurantScraper')

const app = express();

app.use(cors())

app.get('/restaurants', async (req, res) => {

   const result= await scrape.scrape("restaurants near "+req.query.county +" county open")

    // Respond with the restaurant json
    res.json(result);
    

    
})

app.listen(4000);