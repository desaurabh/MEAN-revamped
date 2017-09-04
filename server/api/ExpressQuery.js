var url = require('url');

function ExpressQuery(req) {
    this.url = req.originalUrl;
    this.encodedQuery = req.query;
    this.decodedQuery = req.query;
    this.obj = {};
    this.keys = {};
};

ExpressQuery.prototype.isUrlEncoded = function() {
    return decodeURIComponent(this.url) !== this.url;
};

ExpressQuery.prototype.decodeAndBuild = function() {
    this.encodedQuery = url.parse(decodeURIComponent(this.url), true).query;
    if (this.encodedQuery !== 'undefined') {
        this.keys = Object.keys(this.encodedQuery);
        for (var k in this.keys) {
            if (k === "0") this.obj[this.keys[k]] = this.encodedQuery[this.keys[k]];
            else {
                var keyArr = this.keys[k].split("[");
                keyArr[1] = keyArr[1].replace("]", "");
                if (!this.obj.hasOwnProperty(keyArr[0]))
                    this.obj[keyArr[0]] = {};
                this.obj[keyArr[0]][keyArr[1]] = this.encodedQuery[this.keys[k]];
            }
        }
    }
    this.decodedQuery = this.obj;
};

module.exports = ExpressQuery;
