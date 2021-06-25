const express = require('express');
const router = express.Router();
const osmosis = require('osmosis');

router.get("/fetchdata", (req, res) => {
    const year = req.body.year || "2020";
    const animal = req.body.animal || "deer";
    const season = req.body.season || "general";
    const url = `https://idfg.idaho.gov/ifwis/huntplanner/stats/?season=${season}&game=${animal}&yr=${year}`;

    requestData(url)
        .then(result => res.json({result}))

    // res.json({results});
});

function requestData(url) {
    return new Promise((resolve,reject) => {
        let response = [];

        osmosis
          .get(url)
          .find("table#stattable tr:gt(0)")
          .set({
            Unit: "td[2]",
            Hunter: "td[4]",
          })
          .data((res) => response.push(res))
          .error((err) => reject(err))
          .done(() => resolve(response));
    })
}

module.exports = router;