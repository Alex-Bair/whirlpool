const pg = require('pg');

// necessary to disable automatic date parsing by node-postgres - see https://60devs.com/working-with-postgresql-timestamp-without-timezone-in-node.html
const { types } = pg;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

const { HttpError } = require('../helpers');

async function createBin(binPath) {
  const text = 'INSERT INTO bins (bin_path) VALUES ($1) RETURNING *';
  const value = [binPath];
  try {
    const newBin = await pool.query(text, value);
    return newBin.rows;
  } catch (err) {
    throw new HttpError(`An error occurred ${err}`, 500);
  }
}

async function getBinId(binPath) {
  const text = 'SELECT id FROM bins WHERE bin_path = $1';
  const value = [binPath];
  try {
    const response = await pool.query(text, value);
    const bin = response.rows[0];
    if (bin === undefined) {
      throw Error;
    }
    return bin.id;
  } catch (err) {
    throw new HttpError('Bin does not exist', 400);
  }
}

async function createRequest(binId, mongoId, httpMethod, httpPath) {
  const text = 'INSERT INTO requests (bin_id, mongo_id, http_method, http_path) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [binId, mongoId, httpMethod, httpPath];
  try {
    return (await pool.query(text, value)).rows[0];
  } catch (err) {
    throw new HttpError(`An error occurred ${err}`, 500);
  }
}

async function getAllRequestsInBin(binPath) {
  try {
    const binId = await getBinId(binPath);
    const text = 'SELECT * FROM requests WHERE bin_id = $1';
    const value = [binId];
    const response = await pool.query(text, value);
    const requests = response.rows;
    return requests;
  } catch (err) {
    throw new HttpError('Bin does not exist', 400);
  }
}

async function getRequest(requestId) {
  const text = 'SELECT * FROM requests WHERE id = $1';
  const value = [requestId];

  try {
    const response = await pool.query(text, value);
    const request = response.rows[0];
    if (request === undefined) {
      throw Error;
    }
    return request;
  } catch (err) {
    throw new HttpError('Request does not exist', 400);
  }
}

async function deleteAllRequestsInBin(binPath) {
  try {
    const binId = await getBinId(binPath);

    const text = 'DELETE FROM requests WHERE bin_id = $1';
    const value = [binId];
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError('Bin does not exist', 400);
  }
}

async function deleteRequest(id) {
  const text = 'DELETE FROM requests WHERE id = $1';
  const value = [id];
  try {
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError('Request does not exist', 400);
  }
}

async function deleteBin(binPath) {
  try {
    const binId = await getBinId(binPath);
    const text = 'DELETE FROM bins WHERE id = $1';
    const value = [binId];
    await deleteAllRequestsInBin(binPath);
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError('Bin does not exist', 400);
  }
}

module.exports = {
  createBin,
  getBinId,
  createRequest,
  getAllRequestsInBin,
  deleteAllRequestsInBin,
  deleteBin,
  deleteRequest,
  getRequest,
};
