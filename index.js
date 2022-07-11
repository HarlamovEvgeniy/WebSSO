const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const session = require('express-session');
const RedisStorage = require('connect-redis')(session);
const Redis = require('redis');
const clientSession = Redis.createClient({ legacyMode: true });
const { libNode } = require('@tonclient/lib-node');
const { initSettings } = require('everscale-did-sdk-radiance');
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();
const _PORT = process.env.PORT || 80;

nextServer.prepare().then(() => {
  const app = express();
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
  app.use('/api', require('./routes/request.routes'));
  app.use('/api', require('./routes/response.routes'));
  app.get('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(_PORT, async (req, res) => {
    console.log('Server Started on PORT: ' + _PORT);
    await clientSession.connect();
    initSettings("devNet", libNode);
  });
  
}).catch((exit) => {
  console.log(console.error(exit.stack));
  process.exit(1);
});