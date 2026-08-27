import {test , expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import invalidData from '../test-data/Invaild_data.json' with {type : 'json'};

test.describe('OrangeHRM Login', ()=>
{
  test('TC1_Login_01 - valid login' , async ({page})=>
    {
    const loginPage = new LoginPage(page);

    await loginPage.Url();
    
    await expect(page).toHaveTitle('OrangeHRM');

    const orangeHrmBrand = page.getByAltText('company-branding');
    await expect(orangeHrmBrand).toBeVisible();

    const orangeHrmLOGO = page.getByRole('img',{name : 'orangehrm-logo'});
    await expect(orangeHrmLOGO).toBeVisible();

    const forgetPasswordOption = page.locator('//p[text()="Forgot your password? "]');
    await expect(forgetPasswordOption).toBeVisible();

    await loginPage.login(
        process.env.ORANGE_HRM_USERNAME,
        process.env.ORANGE_HRM_PASSWORD
    );
    const DashboardURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
    await expect(page).toHaveURL(DashboardURL);
 });

  test('TC2_Login_02 - invalid Password',async ({page})=>
    {
      const loginPage = new LoginPage(page);

      await loginPage.Url();

      loginPage.login
      (
         invalidData.invalidPassword.username,
         invalidData.invalidPassword.password
      );
      await expect(loginPage.errorMessage).toHaveText(invalidData.invalidPassword.expectedError);
    });

  test('TC3_Login_03 - invalid Username' , async ({page})=>
    {
    const loginPage = new LoginPage(page);
    await loginPage.Url();

    loginPage.login(
      invalidData.invalidUsername.username,
      invalidData.invalidUsername.password
    );
    await expect(loginPage.errorMessage).toHaveText(invalidData.invalidUsername.expectedError);
  });

  test('TC4_Login_04 - invalid username and invalid password',async ({page})=>{

   const loginPage = new LoginPage(page);
   await loginPage.Url();
   const thirdPartyLink = page.locator('//div[contains(@class,"footer-sm")]/a');

   await expect(thirdPartyLink).toHaveCount(4);
   await loginPage.login(
    invalidData.invalidUsernameANDPassword.username,
    invalidData.invalidUsernameANDPassword.password
   );
  await expect(loginPage.errorMessage).toHaveText(invalidData.invalidUsernameANDPassword.expectedError);   
  });

});



