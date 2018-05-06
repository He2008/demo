var fs = require('fs')
var express = require('express')
const crypto = require('crypto')
const Wechat =require('../wechat/wechat')

const config ={
    token : '12345678',
    "appID":"wxb3b10eb013961728",
    "appScrect":"45cc8668faca97800bb713dcf2fde824",
    "apiDomain":"https://api.weixin.qq.com/",
    "apiURL":{
        "accessTokenApi":"%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s"
    }
}

var router = express.Router();
let wechatApp = new Wechat(config)

router.get('/', (req, res) => {
    wechatApp.auth(req,res)
})
router.get('/init',(req,res)=>{
    wechatApp.getAccessToken().then(data=>{
        wechatApp.getTicket().then(data=>{
            res.send(data)
        })
    }).catch(err=>{
        console.log(err)
    })
})
module.exports = router