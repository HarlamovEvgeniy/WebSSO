const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis');
const btoa = require('btoa');
const { client } = require('../utils/storage/redis');
const { _HOST, _PORT } = require('../env-config');

router.get('/url', cors(), async (req, res) => {
  try {
    if(req?.query?.endpoint && req?.query?.method) {
      
      req.session.endpoint = req.query.endpoint;
      req.session.method = req.query.method;
      req.session.key = await utils.generateString(32);

      console.log('Session ID URL:', req.sessionID);
      
      var key = req.session.key;
      var data = {
        message: await utils.generateString(12)
      }

      if(req?.query?.data?.attributes && utils.requireAttributes(req.query.data.attributes)) {
        data.attributes = req.query.data.attributes
      }

      await client.setEx(key, 900, JSON.stringify(data))
      console.log(key)
      const QRCode = {
        endpoint: _HOST + 'api/requestData', 
        key: key
      }

      const response = {
        url: (_HOST + '?auth=' + btoa(JSON.stringify(QRCode))).toString()
      }


      res.redirect(response.url);
    } else {
      res.statusCode = 302;
      return res.json('No Query Endpoint & No Query Method');
    }
  } catch (error) {
    res.statusCode = 500;
    return res.json(error);
  } 
  
})

module.exports = router;