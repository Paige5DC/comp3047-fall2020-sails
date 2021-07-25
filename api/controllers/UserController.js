/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //login
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).json("User not found");
    
        if (user.password != req.body.password) 
            return res.status(401).json("Wrong Password" + user.password + req.body.password);
    
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.userrole = user.role;
            req.session.coins = user.coins;

            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;
            req.session.userid = user.id;
            req.session.userrole = user.role;
            req.session.coins = user.coins;

            return res.json(user);
        });
    },


    //logout
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");

        });
    },

    //populate
    populate: async function (req, res) {

        var user = await User.findOne(req.session.userid).populate("Redeem");

        if (!user) return res.notFound();

        return res.json(user);
    },

    //redeem
    redeem: async function (req, res) {

        if (req.wantsJSON) {

            if (!await User.findOne(req.session.userid)) return res.status(404).json("User not found.");

            var thatWeb = await Web.findOne(req.params.fk).populate("Buyer", { id: req.session.userid });

            if (thatWeb.Buyer.length > 0)
                return res.status(409).json("Already added.");

            if (thatWeb.quota <= 0) return res.status(410).json("Not enough quota.");

            if (req.session.coins < thatWeb.coins) return res.status(411).json("Not enough coins.");

            await User.addToCollection(req.session.userid, "Redeem").members(req.params.fk);
            
            var updatedQuota = await Web.updateOne(req.params.fk).set({ quota: thatWeb.quota - 1 });
            
            var updatedCoins = await User.updateOne(req.session.userid).set({ coins: req.session.coins - thatWeb.coins });
            
            req.session.coins = updatedCoins.coins;

            return res.ok();
        }

    },


};

