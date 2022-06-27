const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');

router.get('/request', cors(), async (req, res) => {
  try {
    if(req.sessionID) {
      const response = {
        didDoc: req.session.token.didDocument,
        isLogin: req.session.token.isAuth,
      }

      res.redirect(req.session.endpoint);
    } else {
      res.sendStatus(102);
    }

    res.statusCode = 200;
    res.json(response);
  } catch (error) { 
    console.log(error);
  } 
})

module.exports = router;