const { Router } = require('express');
const cors = require('cors');
const router = Router();
const utils = require('../utils');
const fs = require('fs')

router.get('/api/request/auth', cors(), async (req, res) => {
  try {
    if(req.sessionID) {
      

      
    } else {
      res.sendStatus(401);
    }

  } catch (error) { 
    console.log(error);
  } 
})

module.exports = router;