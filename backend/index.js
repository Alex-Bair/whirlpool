/* eslint-disable no-console */
const mongoose = require('mongoose');
const httpServer = require('./app');

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
    httpServer.listen(process.env.BACKEND_PORT, () => console.log('App Running on port 3000'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
