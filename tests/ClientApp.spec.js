const {test, expect} = require('@playwright/test');

test.only('Client App Login', async ({page})=> 
{
    const email = "ljubisa.milosov@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Muirotanas24");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for(let i = 0; i < count; ++i)
    {
           if(await products.nth(i).locator("b").textContent() === productName)
           {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
           }
    }
    
    await page.locator("[routerlink*='cart']").click();
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

    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID is " + orderId);
    
    




});
