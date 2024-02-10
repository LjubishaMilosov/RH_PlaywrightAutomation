const { test, expect, request } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {
    userEmail: "ljubisa.milosov@gmail.com",
    userPassword: "Muirotanas24",
  };
  const orderPayLoad = {
    orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
  };
let token;
let orderId;
let response;
test.beforeAll(async () => 
{
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

});

test("Place Order", async ({ page }) => {
  
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const email = "ljubisa.milosov@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator(".btn-primary").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator("div .col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});