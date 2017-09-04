var limit = require("./limit"),
    ExpressQuery = require("./ExpressQuery"),
    mQuery = require("./mQuery");

function API(req) {
    this.limit = 'undefined';
    this.requestFor = 'undefined';
    this.mQuery = 'undefined';
    var eQuery = new ExpressQuery(req);
    if (eQuery.isUrlEncoded()) eQuery.decodeAndBuild();
    req.query = eQuery.decodedQuery;
    if (req.query.hasOwnProperty('q')) {
        switch (req.query.q) {
            case "limit":
                this.requestFor = "limit";
                this.limit = new limit(req);
                break;
            case "count":
                this.requestFor = "count";
                break;
            case "query":
                this.requestFor = "query";
                var q = new mQuery(req.query.query);
	        this.mQuery = q.transformedQuery;
                break;
        }
    }
};
module.exports = API;
