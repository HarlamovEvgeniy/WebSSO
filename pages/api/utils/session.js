import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import RedisStoreFactory from "connect-redis";
import Redis from "ioredis";

const RedisStore = RedisStoreFactory(expressSession);
export const getSession = nextSession({
  name: 'web-sso',
  cookie: {
    secure: true,
    httpOnly: false,
  },
  store: promisifyStore(
    new RedisStore({
      client: new Redis(process.env.REDIS_URL),
    })
  )
});