const { test, expect, request } = require("@playwright/test");
const {ApiUtils} = require('./utils/APIUtils');
const loginPayLoad = {
    userEmail: "ljubisa.milosov@gmail.com",
    userPassword: "Muirotanas24",
  };
  const orderPayLoad = {
    orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
  };
let token;
let orderId;
test.beforeAll(async () => 
{
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  apiUtils.createOrder(orderPayLoad);



test("Place Order", async ({ page }) => {
   const ApiUtils = new ApiUtils(apiContext,loginPayLoad);
    const orderId = createOrder(orderPayLoad);
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  const email = "ljubisa.milosov@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");

  // await page.locator("#userEmail").fill(email);
  // await page.locator("#userPassword").fill("Muirotanas24");
  // await page.locator("[value='Login']").click();
  //await page.waitForLoadState('networkidle');

  // await page.locator(".card-body b").first().waitFor();
  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);

  // const count = await products.count();
  // for(let i = 0; i < count; ++i)
  // {
  //        if(await products.nth(i).locator("b").textContent() === productName)
  //        {
  //         await products.nth(i).locator("text= Add To Cart").click();
  //         break;
  //        }
  // }

  // await page.locator("[routerlink*='cart']").click();
  // await page.locator("div li").first().waitFor();
  // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // expect(bool).toBeTruthy();
  // await page.locator("text=Checkout").click();
  // await page.locator("[placeholder='Select Country']").pressSequentially("ind");
  // const dropdown = page.locator("section.ta-results");
  // await dropdown.waitFor();
  // const optionsCount =await dropdown.locator("button").count();

  // for(let i = 0; i < optionsCount; ++i)
  // {
  //     const text = await dropdown.locator("button").nth(i).textContent();

  //     if(text === " India")
  //     {
  //         await dropdown.locator("button").nth(i).click();

  //         break;
  //     }
  // }

  // await expect(page.locator(".user__name label")).toHaveText(email);
  // await page.locator(".action__submit").click();
  // await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  // console.log("Order ID is " + orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator(".btn-primary").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator("div .col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
