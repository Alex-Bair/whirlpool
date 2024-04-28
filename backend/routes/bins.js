const express = require('express');
const { v4: uuidv4 } = require('uuid');
const postgres = require('../db/postgres_utils');
const mongoDb = require('../db/mongo_utils');
const { HttpError } = require('../helpers');

const router = express.Router();

// GET all requests for bin
router.get('/:bin_path/requests', async (req, res, next) => {
  const binPath = req.params.bin_path;
  try {
    const result = await postgres.getAllRequestsInBin(binPath);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET a single request's details from MongoDB
router.get('/requests/:request_id', async (req, res, next) => {
  const requestId = req.params.request_id;
  let request;
  try {
    request = await postgres.getRequest(requestId);
  } catch (error) {
    next(error);
    return;
  }

  const mongoId = request.mongo_id;
  const result = await mongoDb.getRequest(mongoId);
  res.json(result);
});

// CREATE a new bin
router.post('/', async (_req, res, next) => {
  const binPath = uuidv4();
  try {
    const result = await postgres.createBin(binPath);
    res.json(result);
  } catch (e) {
    const error = new HttpError(`Something went wrong ${e}`, 500);
    next(error);
  }
});

// DELETE a bin
router.delete('/:bin_path', async (req, res, next) => {
  const binPath = req.params.bin_path;
  let allRequests;
  try {
    allRequests = await postgres.getAllRequestsInBin(binPath);
  } catch (error) {
    next(error);
    return;
  }

  const promises = [];

  for (let i = 0; i < allRequests.length; i += 1) {
    const mongoId = allRequests[i].mongo_id;
    promises.push(mongoDb.deleteRequest(mongoId));
  }

  promises.push(postgres.deleteBin(binPath));
  await Promise.all(promises);
  res.json({ success: 'ok' });
});

// DELETE a single request
router.delete('/:bin_path/requests/:request_id', async (req, res, next) => {
  const binPath = req.params.bin_path;
  const requestId = req.params.request_id;
  let mongoId;
  try {
    const request = await postgres.getRequest(requestId);
    mongoId = request.mongo_id;
    await postgres.deleteRequest(requestId);
    await mongoDb.deleteRequest(mongoId);
  } catch (error) {
    next(error);
    return;
  }

  const io = req.app.get('socketio');
  io.to(binPath).emit('deleteRequest', mongoId);

  res.json({ success: 'ok' });
});

// DELETE all requests in bin
router.delete('/:bin_path/requests', async (req, res, next) => {
  const binPath = req.params.bin_path;
  let allRequests;
  try {
    allRequests = await postgres.getAllRequestsInBin(binPath);
  } catch (error) {
    next(error);
    return;
  }
  const promises = [];

  for (let i = 0; i < allRequests.length; i += 1) {
    const mongoId = allRequests[i].mongo_id;
    promises.push(mongoDb.deleteRequest(mongoId));
  }

  promises.push(postgres.deleteAllRequestsInBin(binPath));

  const io = req.app.get('socketio');
  io.to(binPath).emit('deleteAllRequests');

  await Promise.all(promises);
  res.json({ success: 'ok' });
});

module.exports = router;
