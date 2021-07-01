// template object for what columns to grab
// NOTE: might eliminate these and dumb down by iterating through each table on
// client side or within osmosis.set(function(){ HERE })

const animal = {
    "Deer": {
      TakeMethod: "td[1]",
      Unit: "td[2]",
      Harvest: "td[3]",
      Hunter: "td[4]",
      Success: "td[5]",
      Days: "td[6]",
      Antlered: "td[7]",
      Anterless: "td[8]",
      Spiked: "td[9]",
      SixPlusPoints: "td[10]",
    },
    "Lion": {
      Unit: "td[1]",
      Harvest: "td[2]",
      Male: "td[3]",
      Female: "td[4]",
    },
    "Wolf": {
      Unit: "td[1]",
      Harvest: "td[2]",
      Male: "td[3]",
      Female: "td[4]",
    },
    "Bear": {
      Unit: "td[1]",
      Harvest: "td[2]",
      Boars: "td[3]",
      Sows: "td[4]",
      Fall: "td[5]",
      Spring: "td[6]",
      Bait: "td[7]",
      Hounds: "td[8]",
      Incidental: "td[9]",
      StillStalk: "td[10]",
    },
    "Goat": {
      HuntNumber: "td[1]",
      TakeMethod: "td[2]",
      Area: "td[3]",
      Hunter: "td[4]",
      Harvest: "td[5]",
      Success: "td[6]",
      Days: "td[7]",
      Billies: "td[8]",
      Nannies: "td[9]",
      SixPlusPoints: "td[10]",
    },
    "Turkey": {
      Season: "td[1]",
      Unit: "td[2]",
      Harvest: "td[3]",
      Hunter: "td[4]",
      DaysPerHunter: "td[5]",
      BirdsPerDay: "td[6]",
      DaysPerBird: "td[7]",
    },
    "Pronghorn": {
      TakeMethod: "td[1]",
      Unit: "td[2]",
      Harvest: "td[3]",
      Hunter: "td[4]",
      Success: "td[5]",
      Days: "td[6]",
      Horned: "td[7]",
      Hornless: "td[8]",
      AvgHornLengthInch: "td[9]",
    },
    "Sheep": {
      HunterNumber: "td[1]",
      TakeMethod: "td[2]",
      Area: "td[3]",
      Hunter: "td[4]",
      Harvest: "td[5]",
      Success: "td[6]",
      Days: "td[7]",
      Rams: "td[8]",
      Ewes: "td[9]",
      AvgHornLengthInch: "td[10]",
      AvgHornCircumferenceInch: "td[10]",
    },
    "Elk": {
      TakeMethod: "td[1]",
      Unit: "td[2]",
      Harvest: "td[3]",
      Hunter: "td[4]",
      Success: "td[5]",
      Days: "td[6]",
      Antlered: "td[7]",
      Anterless: "td[8]",
      Spike: "td[9]",
      SixPlusPoints: "td[10]",
    },
    "Moose": {
      HunterNumber: "td[1]",
      TakeMethod: "td[2]",
      Area: "td[3]",
      Hunters: "td[4]",
      Harvest: "td[5]",
      Success: "td[6]",
      Days: "td[7]",
      Bulls: "td[8]",
      Cows: "td[9]",
      AvgAntlerSpreadInch: "td[10]",
    }
}

module.exports = animal;