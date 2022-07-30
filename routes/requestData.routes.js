const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');
const { _HOST } = require('../env-config');

router.post("/data", cors(), async (req, res) => {
    try {
        if(req?.body?.key) {
            var key = req.body.key;
            await client.get(key, async (err, data) => {
                if(err) {
                    res.statusCode = 500
                    return res.json(err)
                }
                var json = JSON.parse(data)
                json.isMobile = true;
                client.ttl(key, async (err, data) => {
                    if(err) {
                        res.statusCode = 500
                        return res.json(err)
                    }
                    await client.setEx(key, data, JSON.stringify(json));
                })
                
                res.statusCode = 200
                res.json({
                    endpoint: _HOST + '/api/response/mobileAuth',
                    attributes: data?.attributes || null
                })
            })
        } else {
            res.sendStatus(400)
        }
    } catch(error) {
        res.sendStatus(500)
        res.json(error)
    }
})

module.exports = router;