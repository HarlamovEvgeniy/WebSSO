const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis')
const { client } = require('../utils/storage/redis');

router.post("/data", cors(), async (req, res) => {
    try {
        if(req?.body?.key) {
            var key = req.body.key;
            var data = JSON.parse(await client.get(key));
            data.isMobile = true;
            await client.setEx(key, await client.ttl(key), JSON.stringify(data));

            res.json({
                endpoint: "http://185.225.35.119:5000/api/response/mobileAuth",
                attributes: data?.attributes || null
            })
        } else {
            res.sendStatus(400)
        }
    } catch(error) {
        res.sendStatus(400)
        res.json(error)
    }
})

module.exports = router;