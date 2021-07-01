const express = require('express');
const router = express.Router();
const osmosis = require('osmosis');
const animal = require('../../models/animals')

router.get("/:season/:animal/:year", (req, res) => {
    const year = req.params.year;
    const animals = req.params.animal;
    const season = req.params.season;

    const url = `https://idfg.idaho.gov/ifwis/huntplanner/stats/?season=${season}&game=${animal}&yr=${year}`;

    switch(animals) {
        case 'Deer':
            animalType = animal.Deer;
            break;
        case 'Elk':
            animalType = animal.Elk;
            break;
        case 'Pronghorn':
            animalType = animal.Pronghorn;
            break;
        case 'Bear':
            animalType = animal.Bear;
            break;
        case 'Lion':
            animalType = animal.Lion;
            break;
        case 'Wolf':
            animalType = animal.Wolf;
            break;
        case 'Moose':
            animalType = animal.Moose;
            break;
        case 'Sheep':
            animalType = animal.Sheep;
            break;
        case 'Goat':
            animalType = animal.Goat;
            break;
        case 'Turkey':
            animalType = animal.Turkey;
            break;
        default:
            animalType = animal.Deer;
    }

    requestData(url,animalType)
        .then(result => res.json({result}))
            .catch((err) => res.status(404).json({err}))
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