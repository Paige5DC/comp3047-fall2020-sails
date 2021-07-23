/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);

  //if (await Web.count() > 0) {
  //  return;
  //}

  await Web.createEach([
    { "title": "The Freshness of spring HK$128","restaurant": "FINDS", "quota":20, "coins":200, "region": "Kowloon", "mall": "Habour City", "image": "https://static-assets.diningcity.asia/uzb3v5nkksxsddprtgojswrf9whv?imageView2/1/w/473/h/254/interlace/1", "detail":"1 appertiser + 1 main course + 1 drink.", "expiryDate":"2021-7-22"},
    { "title": "Weekend Brunch for HK$348","restaurant": " FINDS ", "quota":20, "coins":200, "region": "Kowloon", "mall": "Habour City", "image": " https://static-assets.diningcity.asia/9vxgvc4lpyt9tchp2t5qpm43on17?imageView2/1/w/805/h/254/interlace/1", "detail":"Menu is only available on weekends from 12pm to 3pm - Minimum for 2 persons", "expiryDate":"2021-7-22"},
    { "title": "Seafood offer for HK$188","restaurant": "meat the sea (Sai Ying Pun)", "quota":20, "coins":200, "region": "HK Island", "mall": "IFC MALL", "image": " https://static-assets.diningcity.asia/ya6h89yszhiq2ge1rn5koznuvso1?imageView2/1/w/805/h/254/interlace/1", "detail":"ONLY THIS WEEK ON TUE/WED/THU (20/7-22/7 12:00 - 21:00)", "expiryDate":"2021-7-22"},
    { "title": "Seafood offer for HK$188","restaurant": "meat the sea(Sheung Wan)", "quota":20, "coins":200, "region": "HK Island", "mall": " Times square", "image": " https://static-assets.diningcity.asia/vuns49llds0ymo2tmlm61iitroo6?imageView2/1/w/805/h/254/interlace/1", "detail":"ONLY THIS WEEK ON TUE/WED/THU (20/7-22/7 12:00 - 21:00)", "expiryDate":"2022-7-22"},
    { "title": "Lunch Buy 3 Get 1 Free","restaurant": "Teppanyaki Kaika", "quota":15, "coins":200, "region": "Kowloon", "mall": "Elements", "image": " https://static6.orstatic.com/userphoto/photo/1/1K0/00B2EH37DB11055CE48E98px.jpg", "detail":"Print the coupon and show the printout to restaurant staff before the meal", "expiryDate":"2022-7-22"},
    { "title": "2 hours all-you-can-eat BBQ Lunch Early Bird section (Tsuen Wan)","restaurant": "Captain Japanese & Korean Restaurant", "quota":30, "coins":150, "region": "New Territories", "mall": "New Town Plaza", "image": " https://bizstatic4.orstatic.com/userphoto/Coupon/1/16K/008EQRC9451BAE26697BCAlx.jpg", "detail":" $78 to enjoy【Captain Japanese & Korean Restaurant】all-you-can-eat BBQ Lunch Early Bird section (Original price: $130) (Tsuen Wan shop only) ", "expiryDate":"2022-7-22"},
    { "title": "American steak house Cash Voucher","restaurant": "Moo Moo’s", "quota":15, "coins":150, "region": "New Territories", "mall": "Tsuen Wan Plaza", "image": " https://bizstatic3.orstatic.com/userphoto/Coupon/1/106/0075DI633291CE47462B32lx.jpg", "detail":" *Cash voucher is not applied on 10% service charges and all drinks. ","expiryDate":"2022-7-22"},
   
   
    // etc.
  ]);

  if (await User.count() > 0) {
    return;
  }
  var hash = await sails.bcrypt.hash("123456", salt);

  await User.createEach([
    { username: "COMP", password: hash, role: "admin"},
    { username: "3047", password: hash, role: "member", coins:1600},
    { username: "pass", password: hash, role: "member", coins:100},
    { username: "fail", role: "visitor"},
  ]);
};
