const express = require('express');
const app = express();
const helmet = require('helmet'); 
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
// const { sessionKey, runPORT } = require('./config/otherConfigs');

const clientEndpoint = 'https://rotarsebastian.github.io';

// Routes
const usersRoute = require('./routes/users');
// const playRoute = require('./routes/playground');

// Get JSON
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// Helmet
app.use(helmet());

// Headers for CORS
app.use((undefined, res, next) => {
    res.header('Access-Control-Allow-Origin', clientEndpoint);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Setup the Knex
const knex = Knex(knexFile.development);
Model.knex(knex); // Give the knex instance to objection.js

// Creating a store for express-session using 
const store = new KnexStore({ knex }); 

// Implement Express-session AFTER Knex configuration
app.use(
    session({
      secret: process.env.SESSION || sessionKey,
      name: 'user_sid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 120000 * 600000
      },
      store: store
    })
);

// Add limiter 
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100 // limit each ip to 4 req per windowsMs
});
app.use('/users', authLimiter);

// Use routes
app.use('/users', usersRoute);
// app.use('/playground', playRoute);

const PORT = process.env.PORT || runPORT;

// #############################################
app.listen(PORT, err => err ? console.log('Server error') : console.log('Server listening on port: ' + PORT));
