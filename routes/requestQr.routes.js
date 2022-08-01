const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');


router.get('/mobile', cors(), async (req, res) => {
    console.log('Mobile Session ID', req.sessionID);
    try {
        if(req.session?.key) {
            client.get(req.session.key, async (err, data) => {
                if(err) {
                    res.statusCode = 500
                    res.json(err)
                }
                var json = JSON.parse(data)
                if(json?.isMobile) {
                    res.statusCode = 200
                    res.json({
                        number: 1,
                        isMobile: true
                    })
                } else {
                    res.statusCode = 200
                    res.json({
                        number: 2,
                        isMobile: false
                    }) 
                }
            })
        } else {
            res.statusCode = 401
            res.json({
                number: 3,
                isMobile: false,
                sessionID: req.sessionID
            })
        }
    } catch(error) {
        res.statusCode = 500;
        res.json(error);
    }
})

module.exports = router;