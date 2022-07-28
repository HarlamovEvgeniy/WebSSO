const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');


router.get('/mobile', cors(), async (req, res) => {
    try {
        // await set("requestQr", req)
        if(req.sessionID) {
            if(req.session?.key) {
                client.get(req.session.key, async (err, data) => {
                    if(err) {
                        res.statusCode = 500
                        return res.json(err)
                    }
                    var json = JSON.parse(data)
                    if(json?.isMobile) {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(102)
                    }
                })
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(403)
        }
    } catch(error) {
        res.statusCode = 500;
        return res.json(error);
    }
})

module.exports = router;