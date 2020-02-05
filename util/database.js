const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://HelloImTheUser:MrDataDOOD30@clusternode-rhosu.mongodb.net/pastTips?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(client => {
            console.log('connected!');
            _db = client.db()
            callback(client)
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    };

const getDb = () => {
    if (_db) {
        return _db;
    } else {
        throw 'no database found';
    }
}
    
exports.mongoConnect = MongoConnect;
exports.getDb = getDb;