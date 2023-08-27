const debug = require('debug')("app:startup");
const config = require('config');
const Morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const courses = require('./courses');
const logger = require('./logger');
const auth = require('./authenticator');

//Configuration
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));

const app = express();
app.use(express.json());
// creating middleware functions
app.use(logger);
app.use(auth);
app.use(helmet());

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use('/api/courses', courses);


if (app.get('env')=== 'development') {
    app.use(Morgan('tiny'));
    debug('Morgan enabled...'); //debug()
}

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello !'});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));