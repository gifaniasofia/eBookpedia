const express = require('express');
const router = require('./routes');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true } ));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/img'));

app.use('/', router);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})