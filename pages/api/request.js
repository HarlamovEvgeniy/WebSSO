import { getSession } from "./Session";

export default async function request(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const session = await getSession(req, res);

  if(session.id) {
    if(session.token.auth) {
      const response = {
        didDoc: session.token.didDocument,
        isLogin: session.token.auth,
      }

      res.send(response);
      res.redirect(session.endpoint);
    } else {
      res.statusCode = 403;
      res.send('API Error');
    }
  } else {
    res.statusCode = 400;
    res.send('API Error');
  }
}
