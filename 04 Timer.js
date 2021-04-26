// *****************************************************************************************
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
// *****************************************************************************************