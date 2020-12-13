const Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  generateUuid: function(table, id) {
    let uuid = uuidv4();
    let queryString = `SELECT * FROM ${table} WHERE ${id}='${uuid}';`
    var Model;
    switch(table) {
      case "import_bill":
        Model = Import_bill;
        break;
      case "products":
        Model = Products;
        break;
      case "suppliers":
        Model = Suppliers;
        break;
      case "type_of_merchandise":
        Model = Type_of_merchandise;
        break;
    }
    Model.getDatastore().sendNativeQuery(queryString)
      .then(function(data) {
        if(data) {
          return commonservice.generateUuid(table, id);
        }
        else {
          return uuid;
        }
      })
  }

}
