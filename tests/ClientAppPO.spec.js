const {test, expect} = require('@playwright/test');
const {POManager} = require('../page_objects/POManager');


test.only('Client App Login', async ({page})=> 
{
    const poManager = new POManager(page);
    const username = "ljubisa.milosov@gmail.com";
    const password = "Muirotanas24";
    const productName = "ZARA COAT 3";
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    page.pause(2000);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator("section.ta-results");
    await dropdown.waitFor();
    const optionsCount =await dropdown.locator("button").count();
    
    for(let i = 0; i < optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
        
            break;
        }
    }

    await expect(page.locator(".user__name label")).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID is " + orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    
    for(let i = 0; i < await rows.count(); i++)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log(rowOrderId);
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator(".btn-primary").first().click();
            break;
        }
    }
    
    const orderIdDetails = await page.locator("div .col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy()



});





// npx playwright test tests/ClientAppPO.spec.js --headed