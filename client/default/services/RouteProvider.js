function Routes(req) {
    var who = false;
    if (typeof req.user!=='undefined') {
        who = req.userIs('admin') === true ? 'admin' : req.userIs('coordinator') === true ? 'coordinator' : req.userIs('subordinate') === true ? 'subordinate' : false;
    }
    this.routes = {};

    switch (who) {
        case "admin":
            this.routes = this.core;
            break;
        case "coordinator":
            break;
        case "suborinates":
            break;
        default:
            this.routes = this.basic();
            break;
    }
    console.log(this.routes);

};



Routes.prototype.core = {
    login: {
        templateUrl: 'views/login.html',
        when: '/login',
        icon: 'security',
        name: 'Login',
        show: false
    },
    home: {
        controller: '',
        controllerAs: '',
        templateUrl: 'views/home.html',
        icon: 'dashboard',
        name: 'Dashboard',
        when: '/home',
        show: true
    },
    register: {
        templateUrl: '../views/user/register.html',
        when: '/register',
        name: 'New user',
        show: false,
        controller: 'AccountController'
    },
    addCompany: {
        templateUrl: '../views/account/register.html',
        when: '/register/company',
        name: 'New Company',
        show: false,
        controller: 'AccountController'
    },
    setup: {
        name: 'Settings',
        show: true,
        showSubItem: false,
        subItems: [{
            name: 'Users',
            icon: 'people',
            templateUrl: 'templates/panel.tmpl.html',
            when: '/setup/user',
            controller: 'UserController'
        }, {
            templateUrl: 'templates/panel.tmpl.html',
            icon: 'account_box ',
            when: '/account',
            name: 'Account',
            controller: 'AccountController'
        }]
    },
    logout: {
        icon: 'exit_to_app',
        name: 'Logout',
        show: false,
        when: 'logout'
    }

};

Routes.prototype.basic = function() {
    return {
        login: this.core.login,
        addCompany: this.core.addCompany,
	register:this.core.register
    };
};


module.exports = Routes;
