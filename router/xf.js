const express = require('express')
const XF = require('../xf/xf')
var multer = require('multer')
var upload = multer({dest :'upload_tmp/'})
const fs =require('fs')

let router = express.Router()
let xunfei = new XF()
router.get('/',(req,res)=>{
    res.send('xf')
})
router.post('/',upload.any(),(req,res)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTION');
    let voice = fs.readFileSync(req.files[0].path);
    let voiceBase64 = new Buffer(voice).toString('base64');
    xunfei.postApi(voiceBase64).then(data=>{
        res.json(data.data)
    }).catch(err =>{
        console.log(err)
    })
})

module.exports = router