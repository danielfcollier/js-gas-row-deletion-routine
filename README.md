# Rows Deletion Routine

## Introduction

Row deletion is a routine necessary in many databases. Maybe you need to clean some garbage blank rows that showed during the process of receiving form data, or you have a specific business rule that you need your data to comply with.

## Routine

Let’s see what needs to be done in order to have a working routine. 

1. First, we need to get the database data;
2. For each entry in the database, test if the data needs to be removed;
3. Then, delete the data that passes the test.

For each use case, the most important part is the test, the business rule, where it can also be just “delete blank rows”.

## Apps Script

Ok, let’s go to build our script.

### Scope:

I will consider a sample employee database with 100 rows (the script will work with any number of rows) found at [E for Excel](http://eforexcel.com/wp/downloads-16-sample-csv-files-data-sets-for-testing/).

The employee database should have only women, because we want to send the data for a partner who will work on a secret marketing campaign just for women.

In the future, we might gather more data that we need to filter as other departments join the campaign, so we want a script that runs daily to remove all the men in the database.

### Database:

We have organized our data in the sheet:
https://docs.google.com/spreadsheets/d/1CPm_bUn805n0gjGUeJEmMgvf02gWliRDVCJN8v_AQts/copy

Writing down each field column position, we have:

```javascript
const databasePositions = {
  EmpId: 1,
  FirstName: 2,
  LastName: 3,
  Gender: 4,
  Email: 5,
  Birthday: 6,
  Weight: 7,
  JoinDate: 8,
  Salary: 9,
  Phone: 10,
  PlaceName: 11,
  City: 12,
  State: 13,
  Zip: 14,
  UserName: 15,
  Password: 16
};
```

### Routine:

The main routine, i.e., the deletion routine, can just be: 

```javascript
function deleteRowsRoutine() {
  let [databaseSheet, databaseData] = getDatabase();
 
  databaseData
    .map(deletionRules)
    .reverse()
    .map(rowDeletionRoutine, databaseSheet);
}
```

I will add an extra step just to count how many rows have been deleted: 
 
 ```javascript
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
```
 
Warning: this might look really simple, but I'm using advanced concepts of Functional Programming in JavaScript. To know more about Functional Programming and specific usage of JavaScript I recommend:

- [Fun Fun Function on YouTube](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)

- [W3 Schools](https://www.w3schools.com/jsref/)

---

We get the data by reading all the data in the first sheet:

```javascript
function getDatabase() {
  const databaseSheet = SpreadsheetApp.getActive().getSheets()[0];
  const maxRows = databaseSheet.getMaxRows();
  const maxColumns = databaseSheet.getMaxColumns();

  const databaseLocation = databaseSheet.getRange(2, 1, maxRows-1, maxColumns);
  const databaseData = databaseLocation.getValues();

  return [databaseSheet, databaseData];
}
```

The deletionRules is a function that is customized with the business logic:

```javascript
function deletionRules(dataRow) {
  let gender = dataRow[databasePositions.Gender - 1];
  let isBusinessRules = (gender !== 'F');
  return isBusinessRules ? true : false;
}
```

After applying the deletionRules we get an array with either true or false for each data row in the database. 

---

We need to apply reverse() in order to delete the rows without changing the index location during the deletion of each row in the sheet database.

For the deletionRowRoutine, we need to also pass the databaseSheet so we can delete the desireds rows. I recommend using **Logger.log(rowPostion)** to understand that we are getting the row positions that pass the test in deletionRules.

Please, note as we reversed the array, we need to also pass the index and the current array to get its length and then get the current row position. The functions return either 1 or 0 to flag if the operation has been successful or failed - it will be helpful to count the number of rows deleted in the execution of the program.

```javascript
function rowDeletionRoutine(isBusinessRules, index, array) {
  if (isBusinessRules) {
    let rowPosition = array.length - index + 1;
    this.deleteRow(rowPosition);
    return 1;
  }
  return 0;
}
```
 
## Timer Routine

The timer is set to run every day at 6 am. Please, note that running this routine will install the trigger on your Google Apps Script environment, so you should run this function only once, just to install the trigger.

```javascript
function createTriggersOnce() {
  try {
    ScriptApp.newTrigger('deleteRowsRoutine')
      .timeBased()
      .atHour(6)
      .everyDays(1)
      .create();
 
    Logger.log('Trigger successfully installed!');
  }
  catch (err) {
    Logger.log('Problem during the installation, try again!');
  }
}
```

## Conclusion

A successful and efficient routine to delete rows has been developed. Now you can make sure that you will have better data management in your spreadsheet data warehouse.
Get a copy of the spreadsheet with the script in it:

https://docs.google.com/spreadsheets/d/1CPm_bUn805n0gjGUeJEmMgvf02gWliRDVCJN8v_AQts/copy
To get a copy of the clasp project on my github, please visit:

https://github.com/danielfcollier/js-gas-row-deletion-routine

p.s.: the files are in the .js format since they are stored locally and managed using [clasp](https://github.com/google/clasp). Learn how to install clasp [here](https://www.youtube.com/watch?v=4Qlt3p6N0es).
