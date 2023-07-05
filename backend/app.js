require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { orgStream } = require('./sockets/orgsPost.socket');
const config = require('./db');
const cors = require('cors');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const link = require('./routes/link');
const messages = require('./routes/messages');
const calendar = require('./routes/calendar');
const orgs = require('./routes/orgs');
const discover = require('./routes/discover');
const ModDB = require('./services/db-mod');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected');
  },
  (err) => {
    console.log('Can not connect to the database' + err);
  }
);

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  // Fork worker processes
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/discover', discover);
  app.use('/api/posts', posts);
  app.use('/api/auth', auth);
  app.use('/api/link', link);
  app.use('/api/calendar', calendar);
  app.use('/api/orgs', orgs);
  app.use('/api/messages', messages);

  app.use('/images', express.static(__dirname + '/uploads'));
  app.use('/images/assets', express.static(__dirname + '/assets/imgs'));
  app.use('/profileimg', express.static(__dirname + '/assets/profiles'));
  app.use('/postimg', express.static(__dirname + '/uploads/posts'));

  const ip = require('./ip');
  const { chatSocket } = require('./sockets/messages.socket');

  orgStream(app);
  chatSocket();

  app.get('/', function (req, res) {
    res.send('hello');
  });

  const PORT = process.env.PORT || 9990;

  app.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is running on ${ip}:${PORT}`);
  });
}
