const { test, expect } = require("@playwright/test");
const { POManager } = require("../page_objects/POManager");

test.only("Client App Login", async ({ page }) => {
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
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

// npx playwright test tests/ClientAppPO.spec.js --headed
