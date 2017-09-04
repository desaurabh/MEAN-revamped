module.exports = {
    addNewToken: function(length, callback) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        if (typeof(callback) === 'undefined') return result;
        else callback(result);
    }
};
