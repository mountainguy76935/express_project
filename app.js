const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/main_page');
const mongoConnect = require('./util/database').mongoConnect;
const path = require('path')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
console.log('views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRouter);

mongoConnect( () => {
    app.listen(3000);
})