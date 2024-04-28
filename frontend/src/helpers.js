function removeBinFromPath(path) {
  const relevantPathArray = path.split('/');
  const relevantPath = '/' + relevantPathArray.slice(2).join('/');

  return relevantPath;
}

function determineBinId(path) {
  return path.split('/')[1];
}

export default {
  removeBinFromPath,
  determineBinId,
};
