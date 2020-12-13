module.exports = {
  tableName: 'types_of_merchandise',
  primaryKey: 'merchandiseId',
  attributes: {
    merchandiseId: {
      type: "string",
      unique: true,
      required: true
    },
    name_merchandise: {
      type: "string"
    },
    material: {
      type: "string"
    },
    origin: {
      type: "string"
    },
    price: {
      type: "string"
    },
    supplierId: {
      type: "string"
    }
  }
}
