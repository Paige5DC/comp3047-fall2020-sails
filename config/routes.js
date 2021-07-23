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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },

  'GET /': 'WebController.home',
  'GET /web': 'WebController.home',

  'GET /web/home': 'WebController.home',
  'POST /web/home': 'WebController.home',

  'GET /web/json': 'WebController.json',

  'GET /web/create': 'WebController.create',
  'POST /web/create': 'WebController.create',

  'GET /web/update/:id': 'WebController.update',
  'POST /web/update/:id': 'WebController.update',
  'POST /web/delete/:id': 'WebController.delete',

  'GET /web/read/:id': 'WebController.read',

  "GET /web/admin": 'WebController.admin',
  "POST /web/admin": 'WebController.admin',

  'GET /web/search': 'WebController.search',
  'POST /web/search': 'WebController.search',

  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /web/:id/owners': 'UserController.populate',
  'POST /web/:id/owners': 'UserController.populate',
  'GET /user/:id/redeem': 'UserController.populate',
  'POST /user/redeem/redeem/:fk': 'UserController.redeem',
  'POST /user/redeem/remove/:fk': 'UserController.remove',

  'GET /user/redeem': 'UserController.populate',
  'POST /user/redeem': 'UserController.populate',
  'GET /web/buyer/:id': 'UserController.populate',
  'POST /web/buyer/:id': 'UserController.populate',
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
