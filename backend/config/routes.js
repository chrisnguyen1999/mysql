/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /getSuppliers': 'MainController.getSuppliers',
  'GET /getMerchandise/:supplierId': 'MainController.getMerchandise',
  'POST /order': 'MainController.order',
  'GET /getOrderBill': 'MainController.getOrderBill',
  'GET /getProduct': 'MainController.getProduct',
  'POST /removeProduct': 'MainController.removeProduct',
  'POST /editProduct': 'MainController.editProduct',
  'GET /getBranch': 'MainController.getBranch',
  'GET /getProductByBranch/:branch': 'MainController.getProductByBranch',
  'POST /buy': 'MainController.buy',
  'GET /getCustomer': 'MainController.getCustomer',
  'GET /getSaleBill': 'MainController.getSaleBill',

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
