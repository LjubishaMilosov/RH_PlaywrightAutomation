class APIUtils
{

    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post(
            "https://www.rahulshettyacademy.com/api/ecom/auth/login",
            {
              data: this.loginPayLoad,
            })
          const loginResponseJson = await loginResponse.json();
          token = loginResponseJson.token;
          console.log(token);
          return token;
    }


    async createOrder(orderPayLoad)
    {
        const orderResponse = await this.apiContext.post(
            "https://www.rahulshettyacademy.com/api/ecom/order/create-order",
            {
              data: orderPayLoad,
              headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json',
              },
            }
          );
          const orderResponseJson = await orderResponse.json();
          console.log(orderResponseJson);
          orderId = orderResponseJson.orders[0];
          return orderId;  
    }
}

module.exports = {APIUtils};

