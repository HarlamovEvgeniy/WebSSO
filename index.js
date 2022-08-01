const express = require('express');
const next = require('next');
const session = require('express-session');
const RedisStorage = require('connect-redis')(session);
const Redis = require('redis');
const clientSession = Redis.createClient({ legacyMode: true });
const { libNode } = require('@eversdk/lib-node');
const { initSettings } = require('everscale-did-sdk-radiance');
const dev = process.env.NODE_ENV !== 'production';
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();
const { _PORT, _HOST } = require('./env-config');
const { initConnect } = require('./utils/storage/redis');

nextServer.prepare().then(() => {
  const app = express();
  app.use(express.json({ extended: true }));
  app.use(
    session({
      store: new RedisStorage({
        url: process.env.REDIS_URL,
        client: clientSession
      }),
      secret: 'web-sso',
      saveUninitialized: true,
      resave: false,
    })
  );

  //Routes
  app.use('/api', require('./routes/url.routes'));
  app.use('/api/request', require('./routes/request.routes'));
  app.use('/api/request', require('./routes/requestQr.routes'));
  app.use('/api/request', require('./routes/requestData.routes'));
  app.use('/api/response', require('./routes/response.routes'));
  app.get('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(_PORT, async (req, res) => {
    console.log('Server Started on PORT: ' + _PORT + '& HOST: ' + _HOST);
    await clientSession.connect();
    initSettings("devNet", libNode);
    await initConnect();
  });
  
}).catch((exit) => {
  console.log(console.error(exit.stack));
  process.exit(1);
});