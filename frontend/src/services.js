import axios from 'axios';

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/bins`;

async function createBin() {
  const result = await axios.post(URL);
  return result.data[0].bin_path;
}

async function getRequestList(binPath) {
  const result = await axios.get(`${URL}/${binPath}/requests`);
  return result.data;
}

async function getRequest(requestId) {
  const result = await axios.get(`${URL}/requests/${requestId}`);
  console.log(result.data);
  return result.data;
}

async function deleteBin(binPath) {
  const result = await axios.delete(`${URL}/${binPath}`);
  console.log(result.data);
}

async function deleteRequest(binPath, requestId) {
  const result = await axios.delete(`${URL}/${binPath}/requests/${requestId}`);
  console.log(result.data);
  return result.data;
}

async function deleteAllRequestsInBin(binPath) {
  const result = await axios.delete(`${URL}/${binPath}/requests`);
  console.log(result.data);
  return result.data;
}

// function removeBinFromPath(path) {
//   const relevantPathArray = path.split('/');
//   const relevantPath = '/' + relevantPathArray.slice(2).join('/');

//   return relevantPath;
// }

// function determineBinId(path) {
//   return path.split('/')[1];
// }

export default {
  createBin,
  getRequestList,
  getRequest,
  deleteBin,
  deleteRequest,
  deleteAllRequestsInBin,
};
