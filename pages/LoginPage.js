
class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.LoginClick = page.getByRole('button',{name:'Login'})
        this.errorMessage = page.locator('//p[text()="Invalid credentials"]');
      }


      async Url(){
       await this.page.goto('/',{
        waitUntil : 'domcontentloaded',
        timeout : 60000
       });
        await this.username.waitFor();
      }

    async login(username,password)
    {
      await this.username.fill(username);
      await this.password.fill(password);
      await this.LoginClick.click();

    }
}
    module.exports = {LoginPage};

