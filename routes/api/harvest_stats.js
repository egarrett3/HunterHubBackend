const express = require('express');
const router = express.Router();
const osmosis = require('osmosis');
const animal = require('../../models/animals')

router.get("/fetchdata", (req, res) => {
    const year = req.body.year;
    const animals = req.body.animal;
    const season = req.body.season;
    const url = `https://idfg.idaho.gov/ifwis/huntplanner/stats/?season=${season}&game=${animal}&yr=${year}`;

    switch(animals) {
        case 'deer':
            animalType = animal.deer;
            break;
        case 'elk':
            animalType = animal.elk;
            break;
        case 'pronghorn':
            animalType = animal.pronghorn;
            break;
        case 'bear':
            animalType = animal.bear;
            break;
        case 'lion':
            animalType = animal.lion;
            break;
        case 'wolf':
            animalType = animal.wolf;
            break;
        case 'moose':
            animalType = animal.moose;
            break;
        case 'sheep':
            animalType = animal.sheep;
            break;
        case 'goat':
            animalType = animal.goat;
            break;
        case 'turkey':
            animalType = animal.turkey;
            break;
        default:
            animalType = animal.deer;
    }

    requestData(url,animalType)
        .then(result => res.json({result}))
});

function requestData(url,animalType) {
    return new Promise((resolve,reject) => {
        let response = [];

        osmosis
          .get(url)
          .find("table#stattable tr:gt(0)")
          .set(animalType)
          .data((res) => response.push(res))
          .error((err) => reject(err))
          .done(() => resolve(response));
    })
}

module.exports = router;