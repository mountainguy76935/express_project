const History = require('../model/data');

exports.getMainPage  = (req, res, next) => {
    res.render('main-page');
};

exports.manageSlash  = (req, res, next) => {
    res.redirect('/home');
};

exports.getResults  = (req, res, next) => {
    History.readAll()
    .then(history => {
        res.render('results', {
            historyProp: history
        })
    })
    .catch(err => {
        console.log(err)
    })
};

exports.postMainPage = (req, res, next) => {
    console.log('body', req.body);
    const net_sales = req.body.net_sales;
    const amount_owed = req.body.amount_owed;
    const food_sales = req.body.food_sales;
    const at_sales = req.body.at_sales;
    const retail_sales = req.body.retail_sales;
    const busser = req.body.busser || 'off';
    const bartender = req.body.bartender || 'off';
    const expo = req.body.expo || 'off';
    const host = req.body.host || 'off';
    let history = new History(net_sales, amount_owed, food_sales, at_sales, retail_sales, busser, bartender, expo, host, null)
    history.getTipTotal();
    console.log(history.tipTotal)
    history.save()
        .then(() => {
            res.redirect('/results')
        })
        .catch(err => {
            console.log(err)
        })
};

exports.postDeleteHistory = (req, res, next) => {
    let id = req.body.id;
    History.delete(id)
        .then(() => {
            res.redirect('/results');
        })
        .catch(err => {
            console.log(err)
        })
};
