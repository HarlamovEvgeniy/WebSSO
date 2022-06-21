import utils from './utils';
import { getSession } from "./Session";

export default async function authorization(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const session = await getSession(req, res);

  if(req?.query?.method && req?.query?.endpoint) {
    session.endpoint = req?.query?.endpoint;
    session.method = req?.query?.method;
    session.message = utils.generateMessage();
    session.token = session.id;

    let QRCode = {
      endpoint: session.endpoint || null,
      method: session.method || null,
      message: session.message || null,
      sessionToken: session.token || null
    }

    res.statusCode = 200;
    res.send(QRCode);
  } else {
    res.statusCode = 404;
    res.send('API Error');
  }
}
