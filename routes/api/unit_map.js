const express = require('express');
const router = express.Router();
const mapUrl = require("../../config/keys").mapURL;
const osmosis = require('osmosis');
const fs = require('fs');


router.get('/', (req,res) => {

    console.log('HOWDY!')
    webscrapeMapPath()
        .then((data) => {
            console.log(data);
            res.json({data})
        })
            .catch((err) => res.status(404).json({ errorMsg:`failed to scrape map ${err}` }))
})

function webscrapeMapPath() {
    return new Promise((resolve,reject) => {
        const response = [];
                console.log(mapUrl);

        osmosis
          .get(mapUrl)
          .find("g#Game_Management_Units_layer > g")
          .set({ 'g' : 'path'})
          .data((res) => {
                console.log('response');
              response.push(res)
            })
          .error((err) => {
                console.log("failed");
              
            reject(err)
        })
          .done(() => resolve(response));
    });
}

module.exports = router;