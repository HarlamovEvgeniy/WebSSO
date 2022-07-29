const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fetch = require('node-fetch')
const { client } = require('../utils/storage/redis');
const btoa = require('btoa')

router.get('/auth', cors(), async (req, res) => {
  try {
    if(req?.session?.key) {
      client.get(req.session.key, async (err, data) => {
        if(err) {
          res.statusCode = 500
          return res.json(err)
        }
        var json = JSON.parse(data)
        if(json?.isAuth) {
          if(req.session.method.toUpperCase() == "POST") {
            var ress = await fetch(req.session.endpoint, {
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                did: json.did
              })
            });
  
            if(ress.status == 200) {
              res.redirect(req.session.endpoint)
            } else {
              res.sendStatus(502)
            }
          } else if(req.session.method.toUpperCase() == "GET") {
            var url = req.session.endpoint + "?data=" + btoa(JSON.stringify({
              did: json.did
            })).toString()
            res.redirect(url)
          } else {
            res.sendStatus(501)
          }
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.sendStatus(401);
    }

  } catch (error) {
    await set('requestError', error)
    res.sendStatus(500)
    res.json(error)
  } 
})

module.exports = router;