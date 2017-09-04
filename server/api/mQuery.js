function MongooseQuery(query) {
    this.query = query;
    this.transformedQuery = undefined;
    if (typeof this.query !== 'undefined') {
        var keys = Object.keys(this.query);
        for (var i in keys) {
            switch (keys[i]) {
                case "$or":
                    this.transformedQuery = this.buildOrQuery(query);
                    break;
            }
        }
    }
}


MongooseQuery.prototype.buildOrQuery = function(query) {
    var q = {
        '$or': []
    };
    Object.keys(query.$or).forEach(function(k, i) {
        var item = {};
        item[k] = query.$or[k];
        q.$or.push(item);
    });
    return q;
};

module.exports = MongooseQuery;
