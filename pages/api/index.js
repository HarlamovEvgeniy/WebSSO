import { getSession } from "./utils/session";

export default async function handler(req, res) {
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