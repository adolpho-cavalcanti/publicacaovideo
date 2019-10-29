const client = require('mongodb').MongoClient;
const config = require('../config/config');
const conn = client.connect(config.uri, config.options).then((conn) => {
    return {
        db: conn.db(config.db),
        close: function () {
            conn.close();
        }
    };
});
module.exports = class Model {
    save() {
        if (this._id) {
            return conn.then((conn) => {
                return conn.db.collection(this.collection).updateOne({ _id: this._id }, { $set: this });
            });
        }
        return conn.then((conn) => {
            return conn.db.collection(this.collection).insertOne(this);
        });
    }

    deconste() {
        if (this._id) {
            return conn.then((conn) => {
                return conn.db.collection(this.collection).deconsteOne({ _id: this._id });
            });
        }
        return null;
    }

    static find(query = {}, sort = {}, limit = 5, collection) {
        return conn.then((conn) => {
            return conn.db.collection(collection).find(query)
                .sort(sort).limit(limit).toArray();
        });
    }

    static close() {
        conn.then((conn) => {
            conn.close();
        });
    }
};