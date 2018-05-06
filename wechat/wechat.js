const crypto = require('crypto');
const axios = require('axios')
const util = require('util')
const fs = require('fs')


let accessTokenJSON = require('./accessToken.json');
let ticketJSON = require('./jsapi_ticket.json')

let Wechat = function (config) {
    this.config = config;
    this.token = config.token;
    this.appID = config.appID;
    this.appScrect = config.appScrect;
    this.apiDomain = config.apiDomain;
    this.apiURL = config.apiURL


}

Wechat.prototype.auth = function (req, res) {
    let signature = req.query.signature, //微信加密签名
        timestamp = req.query.timestamp, //时间戳
        nonce = req.query.nonce, //随机数
        echostr = req.query.echostr; //随机字符串
    // 1）将token、timestamp、nonce三个参数进行字典序排序
    let arr = [this.token, timestamp, nonce]
    arr.sort()
    // 2）将三个参数字符串拼接成一个字符串进行sha1加密 
    let tempStr = arr.join('')
    const hashCode = crypto.createHash('sha1')
    let resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
    // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    console.log(signature, resultCode)
    if (resultCode === signature) {
        res.send(echostr)
    } else {
        res.send('mismatch');
    }
}

Wechat.prototype.getAccessToken = function (req, res) {
    let _this = this;
    return new Promise(function (resolve, reject) {
        let currentTime = new Date().getTime()
        let url = util.format(_this.apiURL.accessTokenApi, _this.apiDomain, _this.appID, _this.appScrect)
        if (accessTokenJSON.access_token === '' || accessTokenJSON.expires_time < currentTime) {
            axios.get(url).then(res => {
                console.log(res.data)
                let result = res.data
                if (!result.errcode) {
                    accessTokenJSON.access_token = result.access_token
                    accessTokenJSON.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                    fs.writeFileSync('./wechat/accessToken.json', JSON.stringify(accessTokenJSON))
                    resolve(accessTokenJSON.access_token)
                } else {
                    resolve(result)
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            resolve(accessTokenJSON.access_token)
        }

    })
}

Wechat.prototype.getTicket = function () {
    let currentTime = new Date().getTime()
    if (ticketJSON.ticket === "" || ticketJSON.expires_time < currentTime) {
        axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessTokenJSON.access_token}&type=jsapi`)
            .then(res => {
                ticketJSON.ticket = res.data.ticket
                ticketJSON.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                fs.writeFileSync('./wechat/jsapi_ticket.json', JSON.stringify(ticketJSON))
                resolve(ticketJSON)
            })
    } else {
        resolve(res)
    }
}

module.exports = Wechat