const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');
const { set } = require('../utils/storage/logs');

router.post('/mobileauth', cors(), async (req, res) => {
  set("response", req)
  try {
    if(req.body?.did && req.body?.parameter && req.body?.key) {
      var data = JSON.parse(await client.get(req.body.key))
      var isAuth = await utils.login(req.body.did, data.message, req.body.parameter)

      if(isAuth) {
        if(req.body?.vp) {
          
        }
        data.isAuth = isAuth
        data.did = req.body.did
        client.setEx(req.body.key, await client.ttl(req.body.key), JSON.stringify(data))
        set("Redis", {
          key: req.body.key,
          data: await client.get(req.body.key)
        })
        res.sendStatus(200)
      } else {
        res.sendStatus(401);
      }

    } else {
      res.sendStatus(400);
    }
  } catch (error) { 
    set("responseError", error)
    res.sendStatus(500)
    res.json(error)
  } 
})

module.exports = router;