import { getSession } from "./utils/session";

export default async function logout(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const session = await getSession(req, res);

  if(session?.id) {
    await session.destroy();
    res.statusCode = 200;
    res.send('Session Destroy');
  } else {
    res.statusCode = 502;
    res.send('Session Not Destroy');
  }
}