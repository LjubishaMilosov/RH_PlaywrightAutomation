const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=> 
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signIn =  page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

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

   // console.log(await cardTitles.first().textContent());
   // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test.only('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('input#username');
    const signIn =  page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").nth(1).click();
   
    await page.locator("#okayBtn").click();
    //for logging in console only:
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
   

});
