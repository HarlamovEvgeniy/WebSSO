const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fs = require("fs");

router.post("/getQr", cors(), async (req, res) => {
    try {
        if(req.sessionID) {
            if(req.body?.response, req.body?.sessionToken) {
                let session
                try {
                    session = JSON.parse(fs.readFileSync(`../session/${req.body.sessionToken}.json`))
                } catch(error) {
                    res.sendStatus(500)
                    return res.json(error)
                }
                session.response = true
                try {
                    fs.writeFileSync(`../session/${req.body.sessionToken}.json`, JSON.stringify(session, null, 2))
                } catch(error) {
                    res.sendStatus(500)
                    return res.json(error)
                }
            } else {
                res.sendStatus(400)
            }    
        }     
    } catch(error) {
        res.statusCode = 500;
        return res.json(error);
    }
})