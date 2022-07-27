const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const btoa = require('btoa');
const client = redis.createClient({legacyMode: true})

router.get('/url', cors(), async (req, res) => {
  try {
    await client.connect()
    if(req?.query?.endpoint && req?.query?.method) {
      req.session.endpoint = req.query.endpoint;
      req.session.method = req.query.method;
      req.session.key = await utils.generateString(64);
      var key = req.session.key
      var data = {
        message: utils.generateString(12)
      }

      if(req?.query?.data?.attributes && utils.requireAttributes(req.query.data.attributes)) {
        data.attributes = req.query.data.attributes
      }

      await client.setEx(key, 900, JSON.stringify(data))

      const QRCode = {
        endpoint: 'http://185.255.35.119:5000/api/requestData',
        key: key
      }

      const response = {
        url: ('http://185.225.35.119:5000/?auth=' + btoa(JSON.stringify(QRCode))).toString()
      }

      res.statusCode = 200;
      return res.json(response);
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