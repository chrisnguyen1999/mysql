const { v4: uuidv4 } = require('uuid');
const customers = require('../models/customers');

module.exports = {

  getSuppliers: function(req, res) {
    let queryString = `SELECT * FROM suppliers`;
    Suppliers.getDatastore().sendNativeQuery(queryString)
      .then(function(data) {
        return res.json({status: "success", data: data.rows})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  getMerchandise: function(req, res) {
    let supplierId = req.params.supplierId;
    let queryString = `SELECT * FROM types_of_merchandise WHERE supplierId = "${supplierId}"`;
    Types_of_merchandise.getDatastore().sendNativeQuery(queryString)
      .then(function(data) {
        return res.json({status: "success", data: data.rows})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  order: function(req, res) {
    let supplierId = req.body.supplierId;
    let staffId = req.body.staffId;
    let total_price = req.body.total_price;
    let amount = req.body.amount;
    let detail = req.body.detail;
    let bill = uuidv4();

    let queryString = `INSERT INTO import_bill (billId, supplierId, staffId, input_day, total_price, amount)
    VALUES ("${bill}", "${supplierId}", "${staffId}", "${new Date(Date.now()).toDateString()}", "${total_price}", "${amount}")
    `;

    Import_bill.getDatastore().sendNativeQuery(queryString)
      .then(function(data) {
        let query = `SELECT name_supplier FROM suppliers WHERE supplierId="${supplierId}"`
        return Suppliers.getDatastore().sendNativeQuery(query)
      })
      .then(function(data) {
        for (let i = 0, p = Promise.resolve(); i < detail.length; i++) {
          p = p.then(_ => new Promise(function(resolve, reject) {
            let query = `INSERT INTO products (productId, product_name, offer, warranty_period, amount, branch, billId, sale_price, import_price)
            VALUES ("${uuidv4()}", "${detail[i].name_merchandise}", "", "", "${detail[i].amount}", "${data.rows[0].name_supplier}", "${bill}", "0", "${detail[i].price}")`;
            Products.getDatastore().sendNativeQuery(query)
              .then(function(data) {
                resolve();
              })
          }))
        }
        res.json({status: "success", message: "Ordered successfully"})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  getOrderBill: function(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;
    let total;
    let queryString = `SELECT * FROM import_bill LIMIT ${limit} OFFSET ${(page-1)*limit}`;
    let query = `SELECT COUNT(billId) FROM import_bill`;

    Import_bill.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        total = data.rows;
        return Import_bill.getDatastore().sendNativeQuery(queryString);
      })
      .then(function(data) {
      return res.json({status: "success", data: data.rows, total: total})
      })
      .catch(function(err) {
        console.log(err)
      })

  },

  getProduct: function(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;
    let total;
    let queryString = `SELECT * FROM products LIMIT ${limit} OFFSET ${(page-1)*limit}`;
    let query = `SELECT COUNT(productId) FROM products`;

    Products.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        total = data.rows;
        return Products.getDatastore().sendNativeQuery(queryString);
      })
      .then(function(data) {
      return res.json({status: "success", data: data.rows, total: total})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  removeProduct: function(req, res) {
    let productId = req.body.productId;

    let query = `DELETE FROM products WHERE productId='${productId}';`
    Products.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        res.json({status: "success", message: "Deleted successfully"})
      })
      .catch(function(err) {
        console.log(err)
      })

  },

  editProduct: function(req, res) {
    let productId = req.body.productId;
    let product_name = req.body.product_name;
    let offer = req.body.offer;
    let warranty_period = req.body.warranty_period;
    let sale_price = req.body.sale_price;

    let queryString = `UPDATE products
    SET product_name='${product_name}', offer='${offer}', warranty_period='${warranty_period}', sale_price='${sale_price}'
    WHERE productId="${productId}";`;
    let query = `SELECT * FROM products WHERE productId="${productId}";`;

    Products.getDatastore().sendNativeQuery(queryString)
      .then(function(data) {
        return Products.getDatastore().sendNativeQuery(query)
      })
      .then(function(data) {
        res.json({status: "success", message: "Updated successfully", data: data.rows})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  getBranch: function(req, res) {
    let query = `SELECT DISTINCT branch FROM products;`;

    Products.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        return res.json({status: "success", data: data.rows})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  getProductByBranch: function(req, res) {
    let branch = req.params.branch;

    let query = `SELECT * FROM products WHERE branch="${branch}" AND amount>0`;

    Products.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        return res.json({status: "success", data: data.rows})
      })
      .catch(function(err) {
        console.log(err)
      })
  },

  buy: function(req, res) {
    let staffId = req.body.staffId;
    let total_price = req.body.total_price;
    let amount = req.body.amount;
    let payment_method = req.body.payment_method;
    let customerName = req.body.customerName;
    let address = req.body.address;
    let phone_number = req.body.phone_number;
    let email = req.body.email;
    let dob = req.body.dob;
    let detail = req.body.detail;
    let customerId = uuidv4();
    let query1 = `INSERT INTO sale_bill (saleBillId, customerId, date_of_purchase, payment_method, total_price, amount, staffId)
    VALUES ('${uuidv4()}', '${customerId}', '${new Date(Date.now()).toDateString()}', '${payment_method}', '${total_price}', '${amount}', '${staffId}');`;

    let query2 = `INSERT INTO customers (customerId, customerName, address, phone_number, email, dob, last_purchase)
    VALUES ('${customerId}', '${customerName}', '${address}', '${phone_number}', '${email}', '${dob}', '${new Date(Date.now()).toDateString()}');`;

    let query3 = `UPDATE customers SET last_purchase="${new Date(Date.now()).toDateString()}" WHERE phone_number="${phone_number}"`;

    Sale_bill.getDatastore().sendNativeQuery(query1)
      .then(function(data) {
        for (let i = 0, p = Promise.resolve(); i < detail.length; i++) {
          p = p.then(_ => new Promise(function(resolve, reject) {
            let query = `UPDATE products SET amount=${detail[i].beforeAmount - detail[i].amount} WHERE productId="${detail[i].productId}"`;
            Products.getDatastore().sendNativeQuery(query)
              .then(function(data) {
                resolve();
              })
          }))
        }
        let queryString = `SELECT phone_number FROM customers WHERE phone_number="${phone_number}"`;
        return Customers.getDatastore().sendNativeQuery(queryString)
      })
      .then(function(data) {
        if(data.rows.length == 0) {
          return Customers.getDatastore().sendNativeQuery(query2)
        }
        else {
          return Customers.getDatastore().sendNativeQuery(query3)
        }
      })
      .then(function(data) {
        return res.json({status: "success", message: "Ordered successfully"})
      })
      .catch(function(err) {
        console.log(err)
      })

  },

  getCustomer: function(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;
    let total;
    let queryString = `SELECT * FROM customers LIMIT ${limit} OFFSET ${(page-1)*limit}`;
    let query = `SELECT COUNT(customerId) FROM customers`;
    Customers.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        total = data.rows;
        return Customers.getDatastore().sendNativeQuery(queryString);
      })
      .then(function(data) {
        return res.json({status: "success", data: data.rows, total: total})
      })
      .catch(function(err) {
        console.log(err)
      })

  },

  getSaleBill: function(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;
    let total;
    let queryString = `SELECT * FROM sale_bill LIMIT ${limit} OFFSET ${(page-1)*limit}`;
    let query = `SELECT COUNT(saleBillId) FROM sale_bill`;

    Sale_bill.getDatastore().sendNativeQuery(query)
      .then(function(data) {
        total = data.rows;
        return Sale_bill.getDatastore().sendNativeQuery(queryString);
      })
      .then(function(data) {
        return res.json({status: "success", data: data.rows, total: total})
      })
      .catch(function(err) {
        console.log(err)
      })

  },

}
