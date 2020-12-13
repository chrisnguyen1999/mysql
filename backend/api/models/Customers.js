module.exports = {
  tableName: 'customers',
  primaryKey: 'customerId',
  attributes: {
    customerId: {
      type: "string",
      unique: true,
      required: true
    },
    customerName: {
      type: "string"
    },
    address: {
      type: "string"
    },
    phone_number: {
      type: "string",
      required: true
    },
    email: {
      type: "string"
    },
    last_purchase: {
      type: "string"
    },
    dob: {
      type: "string"
    }
  }
}
