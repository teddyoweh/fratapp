require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db');
const cors = require('cors');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
 
 

const compression = require('compression');


 
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database' + err);
    }
);

const app = express();


app.use(compression())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/posts', posts);
app.use('/api/auth', auth);

app.use('/images', express.static(__dirname + '/uploads'));
app.use('/images/assets', express.static(__dirname + '/assets/imgs'));
app.use('/profileimg', express.static(__dirname + '/assets/profiles'));
app.use('/postimg', express.static(__dirname + '/uploads/posts'));

const ip = require('./ip');
 
// r

//unreadCountSocket(app);

app.get('/', function (req, res) {
    res.send('hello');
});

const PORT = 9990;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Herds Server running on ${ip}:${PORT}`);
});
