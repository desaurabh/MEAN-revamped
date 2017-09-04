var config = {
    development: {
        mode: 'development',
        port: 3000,
    },
    staging: {
        mode: 'staging',
        port: 5000
    },
    production: {
        mode: 'production',
        port: 8000
    }
};

module.exports = function() {
    return config[process.argv[2] || 'development'] || config.development;
};
