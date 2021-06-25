const express = require('express');
const router = express.Router();
const osmosis = require('osmosis');

router.get("/fetchdata", (req, res) => {
    const year = req.body.year || "2020";
    const animal = req.body.animal || "deer";
    const season = req.body.season || "general";
    const url = `https://idfg.idaho.gov/ifwis/huntplanner/stats/?season=${season}&game=${animal}&yr=${year}`;

    switch(animal) {
        case 'deer':
            animalType = deer;
            break;
        case 'elk':
            animalType = elk;
            break;
        case 'pronghorn':
            animalType = pronghorn;
            break;
        case 'bear':
            animalType = bear;
            break;
        case 'lion':
            animalType = lion;
            break;
        case 'wolf':
            animalType = wolf;
            break;
        case 'moose':
            animalType = moose;
            break;
        case 'sheep':
            animalType = sheep;
            break;
        case 'goat':
            animalType = goat;
            break;
        case 'turkey':
            animalType = turkey;
            break;
        default:
            animalType = deer;
    }

    requestData(url,animalType)
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
            TakeMethod : 'td[1]',
            Unit: "td[2]",
            Harvest : 'td[3]',
            Hunter: "td[4]",
            Success : "td[5]",
            Days : "td[6]",
            Antlered : "td[7]",
            Anterless : "td[8]",
            Spiked : "td[9]",
            SixPlusPoints : "td[10]",
          })
          .data((res) => response.push(res))
          .error((err) => reject(err))
          .done(() => resolve(response));
    })
}

const deer =  {
    TakeMethod : 'td[1]',
    Unit: "td[2]",
    Harvest : 'td[3]',
    Hunter: "td[4]",
    Success : "td[5]",
    Days : "td[6]",
    Antlered : "td[7]",
    Anterless : "td[8]",
    Spiked : "td[9]",
    SixPlusPoints : "td[10]",
}

const lion = { 
    Unit : 'td[1]',
    Harvest: "td[2]",
    Male : 'td[3]',
    Female: "td[4]",
}

const wolf = { 
    Unit : 'td[1]',
    Harvest: "td[2]",
    Male : 'td[3]',
    Female: "td[4]",
}

const bear = {
    Unit : 'td[1]',
    Harvest : "td[2]",
    Boars : 'td[3]',
    Sows : "td[4]",
    Fall : "td[5]",
    Spring : "td[6]",
    Bait : "td[7]",
    Hounds : "td[8]",
    Incidental : "td[9]",
    StillStalk : "td[10]",
}

const goat = {
    HuntNumber : 'td[1]',
    TakeMethod: "td[2]",
    Area : 'td[3]',
    Hunter: "td[4]",
    Harvest : "td[5]",
    Success : "td[6]",
    Days : "td[7]",
    Billies : "td[8]",
    Nannies : "td[9]",
    SixPlusPoints : "td[10]",
}

const turkey = {
    Season : 'td[1]',
    Unit: "td[2]",
    Harvest : 'td[3]',
    Hunter: "td[4]",
    DaysPerHunter : "td[5]",
    BirdsPerDay : "td[6]",
    DaysPerBird : "td[7]",
}

const pronghorn = {
    TakeMethod : 'td[1]',
    Unit: "td[2]",
    Harvest : 'td[3]',
    Hunter: "td[4]",
    Success : "td[5]",
    Days : "td[6]",
    Horned : "td[7]",
    Hornless : "td[8]",
    AvgHornLengthInch : "td[9]",
}

const sheep = {
    HunterNumber : 'td[1]',
    TakeMethod: "td[2]",
    Area : 'td[3]',
    Hunter : "td[4]",
    Harvest : "td[5]",
    Success : "td[6]",
    Days : "td[7]",
    Rams : "td[8]",
    Ewes : "td[9]",
    AvgHornLengthInch : "td[10]",
    AvgHornCircumferenceInch : "td[10]",
}

const elk = {
    TakeMethod : 'td[1]',
    Unit: "td[2]",
    Harvest : 'td[3]',
    Hunter: "td[4]",
    Success : "td[5]",
    Days : "td[6]",
    Antlered : "td[7]",
    Anterless : "td[8]",
    Spike : "td[9]",
    SixPlusPoints : "td[10]",
}

const moose = {
    HunterNumber : 'td[1]',
    TakeMethod : "td[2]",
    Area : 'td[3]',
    Hunters : "td[4]",
    Harvest : "td[5]",
    Success : "td[6]",
    Days : "td[7]",
    Bulls : "td[8]",
    Cows : "td[9]",
    AvgAntlerSpreadInch : "td[10]",
}

module.exports = router;