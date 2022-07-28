const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');
const { set } = require('../utils/storage/logs');


router.get('/mobile', cors(), async (req, res) => {
    set("requestQr", req)
    try {
        if(req.sessionID) {
            if(req.session?.key) {
                var data = JSON.parse(client.get(req.session.key))
                if(data?.isMobile) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(102)
                }
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(403)
        }
    } catch(error) {
        set("requestQrError", error)
        res.statusCode = 500;
        return res.json(error);
    }
})

module.exports = router;