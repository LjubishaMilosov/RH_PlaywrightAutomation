const { test, expect, request } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "ljubisa.milosov@gmail.com", userPassword: "Muirotanas24"};
const orderPayLoad = {orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],};
const fakePayLoadOrders = {data:[], message:"No Orders"};

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


  await page.goto("https://rahulshettyacademy.com/client");
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  async route =>{
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayLoadOrders);
    route.fulfill(
    {
      response, body, 
    });
  });
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  
  console.log(await page.locator(".mt-4").textContent());
  
  

  
});