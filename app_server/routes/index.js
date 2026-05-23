var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travlr Getaways' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Travlr'});
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Travlr'});
});

router.get('/meals', (req, res)=> {
  res.render('meals', { title: 'Meals & Dining' });
});

router.get('/rooms', (req, res) => {
  res.render('rooms', { title: 'Rooms & Suites' });
});

router.get('/travel', (req, res) => {
  res.render('travel', { title: 'Travel Packages' });
});

module.exports = router;
