// *****************************************************************************************
function deletionRules(dataRow) {
  let gender = dataRow[databasePositions.Gender - 1];
  let isBusinessRules = (gender !== 'F');
  return isBusinessRules ? true : false;
}
// *****************************************************************************************
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
// *****************************************************************************************