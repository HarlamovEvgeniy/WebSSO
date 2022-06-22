import { getSession } from "./utils/session";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
  const session = await getSession(req, res);

  if(session?.id) {
    res.statusCode = 201;
    res.json(session.id);
  } else {
    res.statusCode = 403;
    res.send({ message: 'ID Not Used' })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};