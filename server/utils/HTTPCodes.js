function build(obj, contentType, response) {
    var res = obj.code + " : " + obj.message;
    switch (contentType) {
        case "text/html":
            response.status(obj.code).send("<p><h2>" + obj.code + "</h2>" + obj.message + "</p>");
            break;
        case "application/json":
            response.status(obj.code).json(obj);
            break;
    }
}

module.exports = {
    OK: {
        code: 200,
        message: 'The request has succeeded.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    CREATED: {
        code: 201,
        message: 'The request has been fulfilled and resulted in a new resource being created.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    ACCEPTED: {
        code: 202,
        message: 'The request has been accepted for processing, but the processing has not been completed.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    NO_CONTENT: {
        code: 204,
        message: 'The server has fulfilled the request but does not need to return an entity-body.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },

    NOT_AUTHORIZED: {
        code: 401,
        message: 'You are not authorized.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    BAD_REQUEST: {
        code: 400,
        message: 'The request could not be understood by the server.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }

    },
    FORBIDDEN: {
        code: 403,
        message: 'Server can/\'t fullfill this request at this moment.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    NOT_FOUND: {
        code: 404,
        message: 'Requested resource is not found in the server at this moment.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.',
        build: function(contentType, res) {
            return build(this, contentType, res);
        }
    }
};
