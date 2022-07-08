const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fs = require('fs')
const session = require('express-session');

router.get('/response', cors(), async (req, res) => {
  try {
    if(req.body?.didDocument && req.body?.parameter && req.body?.sessionToken) {
      var session = JSON.parse(fs.readFileSync(`../sessions/${req.body.sessionToken}.json`))
      const possibleUser = await utils.login(req.body.didDocument, session.message, req.body.parameter);

      if(possibleUser) {
        session.didDocument = req.body.didDocument;
        session.isAuth = true;

        fs.writeFileSync(`./sessions/${req.body.sessionToken}.json`, JSON.stringify(session, null, 2))
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) { 
    console.log(error);
  } 
})

module.exports = router;