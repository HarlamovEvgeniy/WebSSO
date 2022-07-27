const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const fetch = require('node-fetch')
const client = redis.createClient({legacyMode: true})
const btoa = require('btoa')


router.get('/api/request/auth', cors(), async (req, res) => {
  try {
    await client.connect()
    if(req?.session?.key) {
      var data = JSON.parse(await client.get(req.session.key))
      if(data?.isAuth) {
        if(req.session.method.toUpperCase() == "POST") {
          var ress = fetch(req.session.endpoint, {
            method: "post",
            body: JSON.stringify({
              did: data.did
            }),
            headers: {'Content-Type': 'application/json'}
          })

          if(ress.status == 200) {
            res.redirect(req.session.endpoint)
          } else {
            res.sendStatus(502)
          }
        } else if(req.session.method.toUpperCase() == "GET") {
          var url = req.session.endpoint + "?data=" + btoa(JSON.stringify({
            did: data.did
          })).toString()
          res.redirect(url)
        } else {
          res.sendStatus(501)
        }
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401);
    }

  } catch (error) { 
    res.sendStatus(500)
    res.json(error)
  } 
})

module.exports = router;