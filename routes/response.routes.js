const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const { client } = require('../utils/storage/redis');

router.post('/mobileauth', cors(), async (req, res) => {
  try {
    if(req.body?.did && req.body?.parameter && req.body?.key) {
      client.get(req.body.key, async (err, data) => {
        if(err) {
          res.statusCode = 500
          return res.json(err)
        }
        var json = JSON.parse(data)
        var isAuth = await utils.login(req.body.did, json.message, req.body.parameter)
        if(isAuth) {
          if(req.body?.vp) {
            
          }
          json.isAuth = isAuth
          json.did = req.body.did
          client.ttl(req.body.key, async (err, data) => {
            if(err) {
                res.statusCode = 500
                return res.json(err)
            }
            await client.setEx(req.body.key, data, JSON.stringify(json));
        })
          res.sendStatus(200)
        } else {
          res.sendStatus(401);
        }
      })
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(500)
    res.json(error)
  } 
})

module.exports = router;