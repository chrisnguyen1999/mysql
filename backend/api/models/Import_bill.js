module.exports = {
  tableName: 'import_bill',
  primaryKey: 'billId',
  attributes: {
    billId: {
      type: "string",
      unique: true,
      required: true
    },
    supplierId: {
      type: "string"
    },
    staffId: {
      type: "string"
    },
    input_day: {
      type: "string"
    },
    total_price: {
      type: "string"
    },
    amount: {
      type: "number"
    }
  }
}
