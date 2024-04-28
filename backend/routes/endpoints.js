const express = require('express');
const psqlDb = require('../db/postgres_utils');
const mongoDb = require('../db/mongo_utils');

const router = express.Router();

function convertRequestToJSON(request) {
  const obj = {
    headers: request.headers,
    body: request.body,
    method: request.method,
    path: request.path,
    query: request.query,
  };

  return obj;
}

// route below is structured to work with both /:bin_path and /:bin_path/:however_many_optional_paths - see https://stackoverflow.com/questions/10020099/express-js-routing-optional-splat-param
router.all('/:bin_path/:remaining_path*?', async (req, res, next) => {
  const binPath = req.params.bin_path;
  let binId;

  try {
    binId = await psqlDb.getBinId(binPath);
  } catch (error) {
    return next(error);
  }

  const requestJSON = convertRequestToJSON(req);

  const mongoRequest = await mongoDb.createRequest(requestJSON);

  const mongoId = mongoRequest.id;
  const newRequest = await psqlDb.createRequest(binId, mongoId, req.method, req.path);

  const io = req.app.get('socketio');
  io.to(binPath).emit('newRequest', newRequest);

  return res.json({ success: true }).status(200);
});

module.exports = router;
