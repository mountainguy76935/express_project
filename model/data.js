// const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

// const getHistoryFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       } else {
//         cb(JSON.parse(fileContent));
//       }
//     });
//   };

const convertToCents = (val) => {
    val = (Math.floor(val*100))/100;
    val = (val-Math.floor(val))<.5 ? Math.floor(val) : (Math.floor(val)+1);
    return val;
}

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'history.json');

module.exports = class History {
    constructor(net_sales, amount_owed, food_sales, at_sales, retail_sales, busser, bartender, expo, host, id){
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.date = new Date().toString().split(' ').splice(0, 5).join(' ');
        this.net_sales = parseInt(net_sales) || 0;
        this.amount_owed = parseInt(amount_owed) || 0;
        this.food_sales = parseInt(food_sales) || 0;
        this.at_sales = parseInt(at_sales) || 0;
        this.retail_sales = parseInt(retail_sales) || 0;
        this.busser = busser;
        this.bartender = bartender;
        this.expo = expo;
        this.host = host;
        this.duBaStart = net_sales - food_sales - retail_sales - at_sales;
        this.duBa = (bartender  === 'on' ? convertToCents((net_sales - food_sales - retail_sales - at_sales) * .06): 0);
        this.duBaAt = (bartender === 'on' ? convertToCents(at_sales * .03) : 0);
        this.expoTip = (expo === 'on' ? convertToCents(food_sales * .02) : 0);
        this.hostTip = (host  === 'on' ? convertToCents(food_sales*(.005) + at_sales*(.005)) : 0);
        this.busserTip = (busser  === 'on' ? convertToCents(net_sales * .02) : 0);
    }

    getTipTotal() {
        return this.tipTotal = (convertToCents((this.duBa + this.expoTip + this.hostTip + this.busserTip + this.duBaAt) + this.amount_owed));
    }

    save() {
      const db = getDb();
        let dbOp;
        if (this._id) {
          dbOp = db
            .collection('history')
            .updateOne({ _id: this._id }, { $set: this });
        } else {
          dbOp = db.collection('history').insertOne(this);
        }
        return dbOp
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }

    static readAll() {
      const db = getDb();
        return db
            .collection('history')
            .find()
            .toArray()
            .then(result => {
            console.log(result);
            return result;
        })
            .catch(err => {
            console.log(err);
    });
}

    static delete(id) {
        const db = getDb();
        return db
          .collection('history')
          .deleteOne({ _id: new mongodb.ObjectId(id) })
          .then(result => {
            console.log('Deleted');
          })
          .catch(err => {
            console.log(err);
          });
      }
}