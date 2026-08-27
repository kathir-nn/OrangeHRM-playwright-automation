class MyInfoPage{

    constructor(page){
        this.page = page;
        this.MyInfoMenu = page.getByRole('link',{name:'My Info'});
        this.MyInfoTap_list = 10;
        this.myInfoTabs = page.locator("//div[@role='tablist' and @class='orangehrm-tabs']/div/a[contains(@class,'orangehrm-tabs-item')]");
        this.PersonalDetails_active = page.getByRole('link',{name:'Personal Details'});
        this.EmployeeName = page.locator('div.orangehrm-edit-employee-name h6');
        this.EmployeeFirstName = page.getByPlaceholder('First Name');
        this.EmployeeMiddleName = page.getByPlaceholder('Middle Name');
        this.EmployeeLastName = page.getByPlaceholder('Last Name');
    };
   async openMyInfo_module()
   {
     await this.MyInfoMenu.click();
   }

   async Fill_EmployeeName(FirstName , MiddleName , LastName)
   {
      await this.EmployeeFirstName.fill(FirstName);
      await this.EmployeeMiddleName.fill(MiddleName);
      await this.EmployeeLastName.fill(LastName);
   }

}
   module.exports = {MyInfoPage};
