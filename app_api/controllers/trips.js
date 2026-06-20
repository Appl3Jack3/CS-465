const mongoose = require('mongoose');
require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
  try {
    const q = await Model.find({}).exec();
    if (!q) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  try {
    const q = await Model.findOne({ code: req.params.tripcode }).exec();
    if (!q) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST: /trips - Adds a new trip
// Regardless of outcome, response muct include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const newTrip = new Model({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length, 
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  try {
    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {

  console.log(req.params);
  console.log(req.body);

  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripcode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      }
    ).exec();

    if (!q) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(201).json(q);

  } catch (err) {
    return res.status(400).json(err);
  }
};
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};
