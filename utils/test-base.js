const base = require('@playwright/test');

exports.customtest = base.test.extend(
{

    testDataForOrder :
    {
        username: "ljubisa.milosov@gmail.com",
        password: "Muirotanas24",
        productName: "ZARA COAT 3"
    }

})