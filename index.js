const express = require('express');
const session = require('express-session');
const RedisStorage = require('connect-redis')(session);
const Redis = require('redis');
const clientSession = Redis.createClient({ legacyMode: true });
const { libNode } = require('@tonclient/lib-node');
const { initSettings } = require('everscale-did-sdk-radiance');

const app = express();
const _PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use(
  session({
    store: new RedisStorage({
      url: process.env.REDIS_URL,
      port: 5200,
      client: clientSession
    }),
    secret: 'web-sso',
    saveUninitialized: true,
    resave: false,
  })
);

//Routes
app.use('/api', require('./routes/auth.routes'));


app.listen(_PORT, async (req, res) => {
  console.log('Server Started on PORT: ' + _PORT);
  await clientSession.connect();
  initSettings("devNet", libNode);
});
