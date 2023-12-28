const {test, expect} = require('@playwright/test');

test.only('Client App Login', async ({page})=> 
{
    const productName = "Zara Coat 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ljubisa.milosov@gmail.com");
    await page.locator("#userPassword").fill("Muirotanas24");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = products.count();
    for(let i = 0; i < count; i++)
    {
           if( products.nth(i).locator("b").textContent() === productName)
           {
            await products.nth(i).locator("text= Add To Cart").click();
           }
           break;
    }
    
    
});
