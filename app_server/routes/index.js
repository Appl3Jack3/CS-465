var express = require('express');
var router = express.Router();

// Import the controller correctly
const travelController = require('../controllers/travel');
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

/* GET pages */

router.get('/travel', travelController.travel);

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Travlr' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Travlr' });
});

router.get('/meals', (req, res) => {
  res.render('meals', { title: 'Meals & Dining' });
});

router.get('/rooms', (req, res) => {
  res.render('rooms', { title: 'Rooms & Suites' });
});

module.exports = router;

