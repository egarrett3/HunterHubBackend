const express = require("express");
const router = express.Router();
const osmosis = require("osmosis");
const baseUrl = require('../../config/keys').harvestURL

router.get("/", (req, res) => {

  const url = `${baseUrl}`

  scrapeOptions(url)
    .then((result) => res.json({result}))
        .catch((err) => res.status(404).json({ err }));

});

function scrapeOptions(url) {
  return new Promise((resolve, reject) => {
    let response = [];

    osmosis
      .get(url)
      .set({
        Deer: `#main-section > ul > li:nth-child(1)`,
        Elk: `#main-section > ul > li:nth-child(2)`,
        Pronghorn: `#main-section > ul > li:nth-child(3)`,
        Bear: `#main-section > ul > li:nth-child(4)`,
        Lion: `#main-section > ul > li:nth-child(5)`,
        Wolf: `#main-section > ul > li:nth-child(6)`,
        Moose: `#main-section > ul > li:nth-child(7)`,
        Sheep: `#main-section > ul > li:nth-child(8)`,
        Goat: `#main-section > ul > li:nth-child(9)`,
        Turkey: `#main-section > ul > li:nth-child(10)`,
      })
      .data((res) => response.push(res))
      .error((err) => reject(err))
      .done(() => resolve(response));
  });
}

module.exports = router;
