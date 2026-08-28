class MyInfoPage{
    constructor(page)
    {
        this.page = page;
        this.MyInfoMenu = page.getByRole('link',{name:'My Info'});
        this.MyInfoTap_list = 10;
        this.myInfoTabs = page.locator("//div[@role='tablist' and @class='orangehrm-tabs']/div/a[contains(@class,'orangehrm-tabs-item')]");
        this.PersonalDetails_active = page.getByRole('link',{name:'Personal Details'});
        this.EmployeeName = page.locator('div.orangehrm-edit-employee-name h6');
        this.EmployeeFirstName = page.locator('//input[@placeholder="First Name"]');
        this.EmployeeMiddleName = page.locator('//input[@placeholder="Middle Name"]');
        this.EmployeeLastName = page.locator('//input[@placeholder="Last Name"]');
        this.SaveButton = page.locator("//p[contains(@class,'orangehrm-form-hint')]/following-sibling::button[@type='submit']");
        this.UpdatePopup = page.getByText('Successfully Updated');

    };
   async openMyInfo_module()
   {
     await this.MyInfoMenu.click();
   }

   async Fill_EmployeeName(FirstName, MiddleName, LastName) {
    await this.EmployeeFirstName.click();
   //  await this.EmployeeFirstName.press('Control+A');
   //  await this.EmployeeFirstName.press('Delete');
    await this.EmployeeFirstName.fill(FirstName);

    await this.EmployeeMiddleName.click();
   //  await this.EmployeeMiddleName.press('Control+A');
   //  await this.EmployeeMiddleName.press('Delete');
    await this.EmployeeMiddleName.fill(MiddleName);

    await this.EmployeeLastName.click();
   //  await this.EmployeeLastName.press('Control+A');
   //  await this.EmployeeLastName.press('Delete');
    await this.EmployeeLastName.fill(LastName);
}

   async SaveButton_employee(){
      await this.SaveButton.click();
   }

   async verifyPopup_message(){
      await this.UpdatePopup.waitFor(
         {
            state:'visible'
         }
      );
   }

}
   module.exports = {MyInfoPage};
