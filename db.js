var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost:27017/TeeruchDB';
var collections = ['Users', 'customer'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};