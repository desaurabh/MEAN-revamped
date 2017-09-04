var ConnectRoles = require('connect-roles');
var userRole = new ConnectRoles({
    failureHandler: function(req, res, action) {
        var accept = req.headers.accept || '';
        res.status(403);
        if (~accept.indexOf('html')) {
            res.render('access-denied', {
                action: action
            });
        } else {
            res.send('Access Denied - You don\'t have permission to :' + action);
        }
    }
});



//userRole configuration
userRole.use('admin', function(req) {
    if (req.user.role === 'admin') {
        return true;
    }
});

userRole.use('coordinator', function(req) {
    if (req.user.role === 'coordinator') 
        return true;

});

userRole.use('subordinate', function(req) {
    if (req.user.role === 'subordinate') {
        return true;
    }
});

module.exports = userRole;
