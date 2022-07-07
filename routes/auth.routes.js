const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fs = require("fs")

router.get('/auth', cors(), async (req, res) => {
  try {
    if(req?.query?.endpoint && req?.query?.method) {
      req.session.endpoint = req?.query?.endpoint;
      req.session.method = req?.query?.method;
      req.session.message = utils.generateMessage();
      req.session.token = req.sessionID

      fs.writeFileSync(`../sessions/${req.sessionID}.json`, JSON.stringify({
        message: req.session.message,
        isAuth: false
      }, null, 2))
    } else {
      res.statusCode = 302;
      return res.json('No Query Endpoint & No Query Method');
    }

    const QRCode = {
      endpoint: req.session.endpoint || null,
      method: req.session.method || null,
      message: req.session.message || null,
      sessionToken: req.session.token || null
    }

    const response = {
      url: ('https://web-sso.vercel.app/?auth=' + btoa(JSON.stringify(QRCode))).toString()
    }

    res.statusCode = 200;
    return res.json(response);
  } catch (error) { 
    res.statusCode = 500;
    return res.json(error)
  } 
})

module.exports = router;