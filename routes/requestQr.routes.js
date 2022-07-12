const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fs = require("fs");


router.get('/requestQr', cors(), async (req, res) => {
    try {
        if(req.sessionID) {
            var session = JSON.parse(fs.readFileSync(`../session/${req.sessionID}.json`))
            if(session?.response) {
                res.sendStatus(200)
            } else {
                res.sendStatus(202)
            }
        } else {
            res.sendStatus(500)
        }
    } catch(error) {
        res.statusCode = 500;
        return res.json(error);
    }
})