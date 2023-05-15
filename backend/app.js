// app.js -t3:16 -e3:16 -d3:16
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./db');
var cors = require('cors')
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const link = require('./routes/link')
const calendar = require('./routes/calendar')
const orgs = require('./routes/orgs')
//const discover = require('./routes/discover')
const ModDB = require('./services/db-mod')

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();


app.use(cors());
// ModDB()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/api/discover',discover)
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/link',link);
app.use('/api/calendar',calendar);
app.use('/api/orgs',orgs);
 
app.use('/images', express.static(__dirname + '/uploads'));
app.use('/images/assets', express.static(__dirname + '/assets/imgs'));
app.use('/profileimg', express.static(__dirname + '/assets/profiles'));

const ip = require('./ip');


app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 9990;

app.listen(PORT, () => {
    console.log(`Server is running on ${ip}:${PORT}`);
});