const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
const multer = require('multer');

   
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'uploads/')
        },
        filename: function (req, file, cb) { 
        cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
    
    const upload = multer({ storage: storage }).single("file")

            

     router.post('/image', (req, res)=> {

        upload(req, res, err => {
            if(err) {
                return res.json({ success:false, err })
            } 
            return res.json({ success: true, filePath:res.req.file.path, fileName:res.req.file.filename })
        })
         
    })

    router.post('/save', (req, res)=> {

     const product = new Product(req.body)

     product.save((err => {
         if(err) return res.status(400).json({ success: false, err })
         return res.status(200).json({ success: true })
     }))
      
         
    })

    router.post('/products', (req, res) => {
        //product db정보 모두 가져오기.
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = req.body.skip ? parseInt(req.body.skip) : 0;

        let findArgs = {};
        
        for(let key in req.body.filters){
            //key 값은 continents, price 
            if(req.body.filters[key].length > 0){
                // checkbox 체크한게 하나라도있다면 참이되니깐 
                findArgs[key] = req.body.filters[key];
            }
        }
        

        Product.find(findArgs)
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) res.status(400).json({ success:false })
            return res.status(200).json({ 
                success: true, productInfo, 
                postSize:productInfo.length })
        })
    })

module.exports = router;
