const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

    router.post('/image', (req, res)=> {
        
        //가져온 이미지 저장부터, 그 후 프론트로 정보 보내줌
        
         
    })

module.exports = router;
