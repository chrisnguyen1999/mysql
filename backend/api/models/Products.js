module.exports = {
  tableName: 'products',
  primaryKey: 'productId',
  attributes: {
    productId: {
      type: "string",
      unique: true,
      required: true
    },
    product_name: {
      type: "string"
    },
    offer: {
      type: "string"
    },
    warranty_period: {
      type: "string"
    },
    sale_price: {
      type: "string"
    },
    import_price: {
      type: "string"
    },
    branch: {
      type: "string"
    },
    amount: {
      type: "number"
    },
    billId: {
      type: "string"
    }
  }
}
