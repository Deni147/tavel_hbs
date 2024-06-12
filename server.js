const { log } = require('console');

/* ------ express ------ */
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

/* ------ routes ------ */
const static = require('./routes/static');
const reviews = require('./routes/reviews');

/* ------ handlebars ------ */
const path = require('node:path');
const hbs = require('hbs');
const hbsConfig = require('./hbs/hbs-config');
// set hbs layout
app.set('view options', { layout: 'layouts/layout' });
// hbs config
hbsConfig(hbs, path);

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// file upload
app.use(fileUpload());

// static assets dir
app.use(express.static('public'));

/* ========== USE ROUTES ========== */
app.use('/', static);
app.use('/reviews', reviews);

// - server settings
// app.listen(() => {
//   log(`Server running at http://localhost:3000/`);
// });

const port = process.env.PORT || 3000;
app.listen(port);
