const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const client = redis.createClient({legacyMode: true})

router.post('/mobileAuth', cors(), async (req, res) => {
  try {
    await client.connect()
    if(req.body?.did && req.body?.parameter && req.body?.key) {
      var data = JSON.parse(await client.get(req.body.key))
      var isAuth = await utils.login(req.body.did, data.message, req.body.parameter)

      if(isAuth) {
        if(req.body?.vp) {
          
        }
        data.isAuth = isAuth
        data.did = req.body.did
        client.setEx(req.body.key, await client.ttl(req.body.key), JSON.stringify(data))
        res.sendStatus(200)
      } else {
        res.sendStatus(401);
      }

    } else {
      res.sendStatus(400);
    }
  } catch (error) { 
    res.sendStatus(500)
    res.json(error)
  } 
})

module.exports = router;