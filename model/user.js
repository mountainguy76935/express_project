const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

modules.exports = class User{
    constructor() {

    }



    setData() {
        const db = getDb();
        let test = new Date().getDate();
        if (test === 1 || test === 16) {
            
          //make a function to cache the information here
        }
      }
      //make a readAll method that will read data for past cycle and process averages!
  
}