const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await console.log(await page.title());
    await page.locator('input#username').fill('rahulshetty');
    await page.locator('[id="password"]').fill('learning');
    await page.locator('#signInBtn').click();
    await page.locator("[style*='block']").textContent();
    console.log(await page.locator("[style*='block']").textContent());
});
