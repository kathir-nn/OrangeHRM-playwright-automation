import {test , expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
const users = require('../test-data/Invaild_data.json');
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

   await myInfoPage.Fill_EmployeeName(
    EmployeeData.employee.firstName,
    EmployeeData.employee.middleName,
    EmployeeData.employee.lastName
  );


})