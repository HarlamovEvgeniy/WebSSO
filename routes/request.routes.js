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
      console.log(req?.session?.key);
      var data = JSON.parse(await client.get(req.session.key))
      if(data?.isAuth) {
        if(req.session.method.toUpperCase() == "POST") {
          var ress = await fetch(req.session.endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              did: data.did
            })
          });

          console.log(ress);

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