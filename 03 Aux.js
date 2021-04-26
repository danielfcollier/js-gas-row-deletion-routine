// *****************************************************************************************
function rowDeletionRoutine(isBusinessRules, index, array) {
  if (isBusinessRules) {
    let rowPosition = array.length - index + 1;
    this.deleteRow(rowPosition);
    return 1;
  }
  return 0;
}
// *****************************************************************************************
function getDatabase() {
  const databaseSheet = SpreadsheetApp.getActive().getSheets()[0];
  const maxRows = databaseSheet.getMaxRows();
  const maxColumns = databaseSheet.getMaxColumns();

  const databaseLocation = databaseSheet.getRange(2, 1, maxRows-1, maxColumns);
  const databaseData = databaseLocation.getValues();

  return [databaseSheet, databaseData];
}
// *****************************************************************************************