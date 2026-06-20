const mongoose = require('mongoose');
const Trip = require('../models/travlr');   // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcomes, response must include HTTP status code
// and JSON message to the requesting client
async function tripsList(req, res) {
  try {
    const q = await Model.find({}).exec(); // No filter, return all records
    if (!q) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// POST: /trips - Adds a new trip
// Regardless of outcome, response must include HTTP status code
// and JSON message to the requesting client
   const tripsAddTrip = async (req, res) => {
     const newTrip = new Model({
       code: req.body.code,
       name: req.body.name,
       length: req.body.length, // comma present 
       start: req.body.start,
       resort: req.body.resort,
       perPerson: req.body.perPerson,
       image: req.body.image,
       description: req.body.description,
     });
   
     try {
       const q = await newTrip.save();
   
      if (!q) { // Database returned no data
        return res.status(400).json({ message: 'Failed to create trip' });
      } else { // Return new trip
        return res.status(201).json(q);
      }
      
     } catch (err) {
       return res.status(500).json(err);
     }
   }
   
   module.exports = {
     tripsList,
     tripsFindByCode,
     tripsAddTrip,
   };

   