import {test , expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
// const users = require('../test-data/Invaild_data.json');
const EmployeeData = require('../test-data/Employee_data.json')

test('TC_05_MyINFO - Navigate to the Module',async ({page})=>
{ 
  const loginpage = new LoginPage(page);
  const myInfoPage = new MyInfoPage(page);
   await loginpage.Url();
   await loginpage.login(
    process.env.ORANGE_HRM_USERNAME,
    process.env.ORANGE_HRM_PASSWORD
   )

   await myInfoPage.openMyInfo_module();
   await expect(page).toHaveURL(/viewPersonalDetails/);   
   await expect(myInfoPage.myInfoTabs).toHaveCount(myInfoPage.MyInfoTap_list);
   // When I click  Myinfo the window defaultly show the PersonalDetails 
   await expect(myInfoPage.PersonalDetails_active).toHaveClass(/--active/);
   //Check employee name visible in the page 
   await expect(myInfoPage.EmployeeName).toBeVisible();
   //check firstname is editable
   await expect(myInfoPage.EmployeeFirstName).toBeEditable();
  //check middlename is editable
   await expect(myInfoPage.EmployeeMiddleName).toBeEditable();
  //check lastname is editable
  await expect(myInfoPage.EmployeeLastName).toBeEditable();  

});

test('TC_06_MyInfo - Update employee FristName MiddleName LastName', async ({page})=>
{
   const loginpage = new LoginPage(page);
   const myInfoPage = new MyInfoPage(page);
   await loginpage.Url();
   await loginpage.login(
    process.env.ORANGE_HRM_USERNAME,
    process.env.ORANGE_HRM_PASSWORD
   );
   await myInfoPage.openMyInfo_module();
   await myInfoPage.Fill_EmployeeName
   (
    EmployeeData.employee.firstName,
    EmployeeData.employee.middleName,
    EmployeeData.employee.lastName
  );
  await expect(myInfoPage.EmployeeFirstName).toHaveValue(EmployeeData.employee.firstName);
  await expect(myInfoPage.EmployeeMiddleName).toHaveValue(EmployeeData.employee.middleName);
  await expect(myInfoPage.EmployeeLastName).toHaveValue(EmployeeData.employee.lastName); 
  await myInfoPage.SaveButton_employee();
  await myInfoPage.verifyPopup_message();
  await expect(myInfoPage.UpdatePopup).toContainText('Successfully Updated');
  await page.reload();
  // Once the employee name is updated, the new name should be displayed at the top of the module.   
  const VerifyFullName = EmployeeData.employee.firstName +' '+EmployeeData.employee.lastName;   
  await expect(myInfoPage.EmployeeName).toHaveText(VerifyFullName);
// const firstName = await myInfoPage.EmployeeFirstName.inputValue();
// const middleName = await myInfoPage.EmployeeMiddleName.inputValue();
// const lastName = await myInfoPage.EmployeeLastName.inputValue();

// console.log('First Name:', firstName);
// console.log('Middle Name:', middleName);
// console.log('Last Name:', lastName);
});