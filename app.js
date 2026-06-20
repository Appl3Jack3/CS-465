const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./app_api/models/db');
const routes = require('./app_api/routes/index');

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Static files and routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

// Error handling
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = app;