/**
 * Created by Rafael Matheus Garcia on 18/10/16.
 */

const config = {};

config.kifi = require('../input_files/kifi-export.js');

config.db = {
    url: 'mongodb://localhost:27017/bookie',
    collection: 'bookmarks',
};

module.exports = config;
