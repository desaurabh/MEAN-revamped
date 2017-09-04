module.exports = function(req) {
    this.default = {
        of: 5,
        from: 0
    };

    if (req.query.hasOwnProperty('q') && req.query.q === 'limit') {
        if (req.query.hasOwnProperty('limit') && (req.query.limit.hasOwnProperty('of') && req.query.limit.hasOwnProperty('of'))) {
            this.default.of = isNaN(parseInt(req.query.limit.of)) ? this.default.of : parseInt(req.query.limit.of);
            this.default.from = isNaN(parseInt(req.query.limit.from)) ? this.default.from : parseInt(req.query.limit.from);
        }
    }
    return this.default;

};
