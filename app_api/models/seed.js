// ✅ Bring in the DB connection and Trip schema
const mongoose = require('mongoose');
require('./travlr');  // register the model
const Trip = mongoose.model('trips');  // get the model

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost/travlr');

// ✅ Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('../data/trips.json', 'utf8'));

// ✅ Delete existing records, then insert seed data
const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
  await mongoose.connection.close()
};

// ✅ Close the MongoDB connection and exit
seedDB().then(async () => {
  await mongoose.connection.close();
  console.log('Database seeded successfully');
  process.exit(0);
});
