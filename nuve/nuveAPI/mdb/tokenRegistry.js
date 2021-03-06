/*global require, exports, console*/
var db = require('./dataBase').db;
var BSON = require('mongodb').BSONPure;

/*
 * Gets a list of the tokens in the data base.
 */
exports.getList = function (callback) {
    "use strict";

    db.tokens.find({}).toArray(function (err, tokens) {
        if (err || !tokens) {
            console.log('Empty list');
        } else {
            callback(tokens);
        }
    });
};

var getToken = exports.getToken = function (id, callback) {
    "use strict";

    db.tokens.findOne({_id: new BSON.ObjectID(id)}, function (err, token) {
        if (token === undefined) {
            console.log('Token ', id, ' not found');
        }
        if (callback !== undefined) {
            callback(token);
        }
    });
};

var hasToken = exports.hasToken = function (id, callback) {
    "use strict";

    getToken(id, function (token) {
        if (token === undefined) {
            callback(false);
        } else {
            callback(true);
        }
    });

};

/*
 * Adds a new token to the data base.
 */
exports.addToken = function (token, callback) {
    "use strict";

    db.tokens.save(token, function (error, saved) {
        callback(saved._id);
    });
};

/*
 * Removes a token from the data base.
 */
exports.removeToken = function (id, callback) {
    "use strict";

    hasToken(id, function (hasT) {
        if (hasT) {
            db.tokens.remove({_id: new BSON.ObjectID(id)});
            callback();
        }
    });
};

/*
 * Updates a determined token in the data base.
 */
exports.updateToken = function (token) {
    "use strict";

    db.tokens.save(token);
};
