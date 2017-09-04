var server = require('./server/conf'),
    util = require('util');
    

    

var buildUser = function(data) {
    var data = data.split(" ");
    return {
        username: data[0],
        fName: data[1],
        lName: data[2],
        email: data[0],
        gender: data[3],
        role: data[4].toLocaleLowerCase()
    };
}

var startServer = function(env, db) {
    var expressSever = server.express(env, db);
    expressSever.listen(env.port, function() {
        console.log("Server started on port %s", env.port);

        //adding demo users

        // user.register(buildUser('adminA@test.com A-Firstname A-Lastname Male Admin'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });

        // user.register(buildUser('adminB@test.com B-Firstname B-Lastname Female Admin'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
        // user.register(buildUser('subordinateA@test.com A-Firstname A-Lastname Male Subordinate'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
        // user.register(buildUser('subordinateB@test.com B-Firstname B-Lastname Female Subordinate'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
        // user.register(buildUser('coordinatorA@test.com A-Firstname A-Lastname Male Coordinator'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
        // user.register(buildUser('coordinatorB@test.com B-Firstname B-Lastname Female Coordinator'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });


	//         user.register(buildUser('Reeva@test.com Reeva Barn Male Coordinator'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
        // user.register(buildUser('klien@test.com klien Pitcher Female Coordinator'), '1782398217', function(err, data) {
        //     if (err) console.log(err);
        //     else console.log(data.username + " successfully saved!");
        // });
	

    });
};


var env = server.server();
var db = server.dbServer(env.mode);
var intialize = startServer(env, db);
