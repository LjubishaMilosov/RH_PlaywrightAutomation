const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=> 
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signIn =  page.locator('#signInBtn');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
    await userName.fill('rahulshetty');
    await page.locator('[id="password"]').fill('learning');
    await signIn.click();
    await page.locator("[style*='block']").textContent();
        console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
        

});
