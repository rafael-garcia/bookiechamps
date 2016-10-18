/**
 * Created by Rafael Matheus Garcia on 18/10/16.
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbConf = require('../config/config').db;
const _ = require('lodash');

function bookieDB() {
    let db = null;

    MongoClient.connect(dbConf.url, (err, mongo) => {
        assert.equal(null, err);
        console.log('Connected successfully to the DB server');

        db = mongo;

        db.createCollection(dbConf.collection);
    });

    const close = (callback) => {
        if (db) {
            db.close();
            callback();
        }
    }

    const insert = (items, callback) => {
        db.bookmarks.insertMany(items, (err, response) => {
            assert.equal(err, null);
            console.log(`Inserted ${response.result.n} documents into the collection`);
            callback(err, response);
        });
    };

    const find = (conditions, callback) => {
        // Get the documents collection
        db.bookmarks.find(conditions).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found the following records');
            console.log(docs);
            callback(docs);
        });
    };

    const update = function (where, newVal, callback) {
        db.bookmarks.updateOne(where, { $set: newVal }, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log('Updated the document with the field a equal to 2');
            callback(result);
        });
    };

    return {
        close,
        insert,
        find,
        update,
    };
}

module.exports = bookieDB;
