angular.module("app.models.company", [])
    .service("Company", function() {

        return function() {
            this.name = '';
            this.phoneOne = '';
            this.phoneTwo = '';
            this.website = '';
	    this.email='';
            this.address = {
		state:'',
                street: '',
                locality: '',
                city: '',
                country: 'India',
                pincode: ''
            };
            this.logo = '';

        };

    });
