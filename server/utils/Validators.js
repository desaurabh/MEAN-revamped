module.exports = {
    isUndefinedOrNull: function(value) {
        return typeof value === 'undefined' || value === null;
    },
    stringIsValid: function(value) {
        return this.isUndefinedOrNull(value) ? false : !this.containsSymbol(value);
    },
    containsSymbol: function(value) {
        return value.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) === null ? false : true;
    },
    isUriEncoded: function(uri) {
        return decodeURIComponent(uri) !== uri;
    }

};



var makeExpressQuery = function(encodedQuery) {
    var obj = {};
    if (encodedQuery !== 'undefined') {
        var keys = Object.keys(encodedQuery);
        for (var k in keys) {
            if (k === "0") obj[keys[k]] = encodedQuery[keys[k]];
            else {
                var keyArr = keys[k].split("[");
                keyArr[1] = keyArr[1].replace("]", "");
 		if(!obj.hasOwnProperty(keyArr[0]))
		    obj[keyArr[0]]={};
                obj[keyArr[0]][keyArr[1]] = encodedQuery[keys[k]];
            }
        }
    }
    return obj;
};
