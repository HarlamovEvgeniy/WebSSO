import utils from './utils';
import { getSession } from "./utils/session";

export default async function response(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const session = await getSession(req, res);

  if(req.body?.didDocument && req.body?.parameter && req.body?.sessionToken) {
    const loginUser = await utils.login(req.body.didDocument, session.token, req.body.parameter);

    if(loginUser) {
      session.token.didDocument = req.body.didDocument;
      session.token.auth = true;
      res.statusCode = 200;
    } else {
      res.statusCode = 401;
      res.send('API Error');
    }

  } else {
    res.statusCode = 400;
    res.send('API Error');
  }
}
