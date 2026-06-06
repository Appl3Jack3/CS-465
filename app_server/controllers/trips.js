const mongoose = require('mongoose');
const Trip = require('../models/travlr');   // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcomes, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
          .find({}) // No filter, return all records
          .exec();

          // Uncomment the following line to show results of querey
          // on the console
          // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err)
    } else { // Return resulting trip list
        return res
                .status
                .json(q);
    }
};

model.exports = {
    tripsList
};