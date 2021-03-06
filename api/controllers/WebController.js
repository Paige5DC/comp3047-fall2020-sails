/**
 * WebController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //action - home
    home: async function (req, res) {

        var HKIsland = await Web.find({
        where: { region: "HK Island" },
        sort: "id DESC",
        limit: 2,
        });

        var Kowloon = await Web.find({
        where: { region: "Kowloon" },
        sort: "id DESC",
        limit: 2,
        });

        var NT = await Web.find({
        where: { region: "New Territories" },
        sort: "id DESC",
        limit: 2,
        })

        return res.view('web/home', {
        HKIsland: HKIsland, 
        Kowloon: Kowloon, 
        NT: NT });
    },



    // action - create (layout unfinished)
    create: async function (req, res) {

        if (req.method == "GET") return res.view('web/create');
        
        var web = await Web.create(req.body).fetch();

        return res.status(201).json({ id: web.id });
    },

     // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatRecord = await Web.findOne(req.params.id);

            if (!thatRecord) return res.notFound();

            return res.view('web/update', { web: thatRecord });

        } else {

            var updatedRecord = await Web.updateOne(req.params.id).set(req.body);

            if (!updatedRecord) return res.notFound();

            return res.ok();
        }
    },

    // action - delete 
    delete: async function (req, res) {

        var deletedRecord = await Web.destroyOne(req.params.id);

        if (!deletedRecord) return res.notFound();

        return res.ok();
    },

    // json function
    json: async function (req, res) {

        var everyones = await Web.find();

        return res.json(everyones);
    },

    // action - read
    read: async function (req, res) {

        var thatRecord = await Web.findOne(req.params.id);

        if (!thatRecord) return res.notFound();

        return res.view('web/read', { web: thatRecord});
    },

    //action - admin
    admin: async function (req, res) {

        var everyRecord = await Web.find();

        return res.view('web/admin', { record: everyRecord });
    },

    //action - search
    search: async function (req, res) {

        if (req.query.Region && req.query.Region != "/") var Region = req.query.searchRegion;
        var searchMinCoin = parseInt(req.query.searchMinCoin);
        var searchMaxCoin = parseInt(req.query.searchMaxCoin);
        var Date = req.query.searchDate || "";
        var limit = Math.max(req.query.limit, 2) || 2;
        var offset = Math.max(req.query.offset, 0) || 0;
        var whereClause = {};

        if (Date.length != 0) whereClause.Date = { '>=': Date };
        whereClause.Coins = { '>=': searchMinCoin, '<=': searchMaxCoin };

        var searchRecords = await Web.find({
            where: whereClause,
            limit: limit,
            skip: offset,
        });
        var count = await Web.count({
            where: whereClause
        });

        if (req.wantsJSON) {
            return res.json({ searchRecords, count });
          } else {
            return res.view('web/search', {  numOfRecords: count });
        };

    },

};

