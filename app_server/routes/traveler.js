var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get Travel view */
const travel = (req, res) => {
  res.render('travel', { title: 'Travel Packages', trips });
};

module.exports = {
  travel
};