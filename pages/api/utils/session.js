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
        port: 37338,
        host: 'eu1-suited-crayfish-37338.upstash.io',
        password: 'd1f43ae71e6a422c93ab4f674a8ceab3',
      }),
    })
  )
});