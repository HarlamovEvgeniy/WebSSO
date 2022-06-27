const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');

router.get('/authorization', cors(), async (req, res) => {
  try {
    if(req?.query?.endpoint && req?.query?.method) {
      req.session.endpoint = req?.query?.endpoint;
      req.session.method = req?.query?.method;
      req.session.message = utils.generateMessage();
      req.session.token = req.sessionID
    } else {
      res.statusCode = 302;
      res.json('No Query Endpoint & No Query Method');
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
    res.json(response);
  } catch (error) { 
    console.log(error);
  } 
})

module.exports = router;