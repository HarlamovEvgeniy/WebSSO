import utils from './utils';
import { getSession } from "./Session";

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const session = await getSession(req, res);

  if(session.id) {
    res.send('API Version 24.06.2022');
  } else {
    res.statusCode = 400;
  }
}
