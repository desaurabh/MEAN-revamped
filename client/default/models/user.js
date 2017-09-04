angular.module("app.models.user", [])
    .service("User", function(Company) {
        return function() {
            this.username = "";
            this.password = "";
            this.email = "";
            this.fName = "";
            this.lName = "";
            this.born = new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000);
            this.role = "";
            this.gender = "";
        };
    });
