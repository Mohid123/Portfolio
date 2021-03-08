const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const connectDB = require('./config/db');

//Load Config

dotenv.config({path: './config/config.env'});

//Passport Config
require('./config/passport')(passport);


connectDB();

const app = express();

//Logging
if(process.env.NODE_ENV === 'development') {
	app.use('morgan'('dev'));
}

//Handebars

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Express Sessions

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

//Static folder

app.use(express.static(path.join(__dirname, 'public')));


//ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));

const port = process.env.PORT || 3000


app.listen(port,
	console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${port}`)
	);