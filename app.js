//app.js
var express 	= require("express");
var app 		= express();
var bodyParser 	= require('body-parser');
//var path = require('path');

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello NodeJS from Express');
})
app.listen(3001);
console.log("My Service is listening to port 3001.");

var MongoClient = require('mongodb').MongoClient;
var dbUrl 		= "mongodb://localhost:27017/TeeruchDB";
var ObjectID 	= require('mongodb').ObjectID;

app.post('/Users/add', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        var id 		= new ObjectID();
        var data 	= req.body;
        data["_id"] = id.toHexString();
        
		db.collection('Users')
            .insertOne(data, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});



app.get('/Users/getMany', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection('Users')
            .find(req.query).toArray(function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});

app.get('/Inquiry/:collectionName', function (req, res) {

	var collectionName 	= req.params.collectionName;
	 
	console.log("Method inquiry collectionName[" + collectionName + "]");
	 
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection(collectionName)
            .find(req.query).toArray(function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});

app.put('/Users/update', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        var opts = (req.body.opts ? req.body.opts : {});
        db.collection('Users')
            .update(req.body.criteria, req.body.data, opts, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});

app.delete('/Users/delete', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection('Users')
            .remove(req.body, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});

app.get('/Views/:view_name', function (req, res) {
	var view_name 	= req.params.view_name;
	res.sendFile(__dirname + '/views/' + view_name + '.html');
	console.log('dir path name[' + __dirname + '/views/' + view_name + '.html' + ']');
});