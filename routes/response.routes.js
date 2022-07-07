const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const session = require('express-session');

router.get('/response', cors(), async (req, res) => {
  try {
    if(req.body?.didDocument && req.body?.parameter && req.body?.sessionToken) {
      const possibleUser = await utils.login(req.body.didDocument, session.parameter);

      if(possibleUser) {
        req.token.didDocument = req.body.didDocument;
        req.token.isAuth = true;
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