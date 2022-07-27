const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');


router.get('/mobile', cors(), async (req, res) => {
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
            res.sendStatus(401)
        }
    } catch(error) {
        res.statusCode = 500;
        return res.json(error);
    }
})

module.exports = router;