import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import RedisStoreFactory from "connect-redis";
import Redis from "ioredis";

const RedisStore = RedisStoreFactory(expressSession);
export const getSession = nextSession({
  name: 'web-sso',
  cookie: {
    secure: true,
    domain: 'localhost'
  },
  store: promisifyStore(
    new RedisStore({
      client: new Redis({
        port: 6379,
        host: '127.0.0.1',
        username: 'my-sso',
      }),
    })
  )
});