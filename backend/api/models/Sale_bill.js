module.exports = {
  tableName: 'sale_bill',
  primaryKey: 'saleBillId',
  attributes: {
    saleBillId: {
      type: "string",
      unique: true,
      required: true
    },
    customerId: {
      type: "string"
    },
    date_of_purchase: {
      type: "string"
    },
    payment_method: {
      type: "string"
    },
    total_price: {
      type: "string"
    },
    amount: {
      type: "number"
    },
    staffId: {
      type: "string"
    }
  }
}
