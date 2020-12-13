const { getSuppliers } = require("../controllers/MainController")

module.exports = {
  tableName: 'suppliers',
  primaryKey: 'supplierId',
  attributes: {
    supplierId: {
      type: "string",
      unique: true,
      required: true
    },
    name_supplier: {
      type: "string"
    },
    address: {
      type: "string"
    },
    phone_number: {
      type: "string"
    },
    email: {
      type: "string"
    }
  }
}
