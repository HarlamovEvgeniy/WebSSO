const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const redis = require('redis');
const btoa = require('btoa');
const { get } = require('../utils/storage/logs');

router.get('/admin', cors(), async (req, res) => {
    try {
        if(req?.query?.key) {
            var data = get()
            res.json(data[req.query.key])
        } else {
            res.json(get())
        }
    } catch(error) {
        res.sendStatus(500)
        res.json(error)
    }
})

module.exports = router