// *****************************************************************************************
function deleteRowsRoutine() {
  let [databaseSheet, databaseData] = getDatabase();

  let deleteStatus = databaseData
    .map(deletionRules)
    .reverse()
    .map(rowDeletionRoutine, databaseSheet);

  let counter = deleteStatus
    .reduce((total, currentValue) => total + currentValue, 0);

  Logger.log(`Number of row(s) deleted: ${counter}`)
}
// *****************************************************************************************