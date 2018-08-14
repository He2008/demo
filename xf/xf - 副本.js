const crypto = require('crypto');
const axios = require('axios')
const util = require('util')
const fs = require('fs')
123
let md5Sign = function (data) {
    var md5 = crypto.createHash('md5').update(data).digest('hex');
    return md5;
}

class XF {
    constructor(config) {
        this.config = {
            appID: '5af14223',
            apiKey: '4b51d6f2337bd033d813444073791335'
        }
    }
    postApi(voice) {
        return new Promise((reslove, reject) => {
            let curTime = (Date.parse(new Date()).toString()).split('000')[0]
            let params = {
                engine_type: 'sms16k',
                aue: 'wav'
            }
            let paramsStr = JSON.stringify(params)
            let audio = encodeURIComponent(voice);
            let checkSum = md5Sign(this.config.apiKey + curTime + new Buffer(paramsStr).toString('base64'))

            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'X-Appid': this.config.appID,
                'X-CurTime': curTime,
                'X-Param': new Buffer(paramsStr).toString('base64'),
                'X-CheckSum': checkSum
            };
            axios.post('http://api.xfyun.cn/v1/service/v1/iat','audio='+audio,{
                headers: headers,
            }).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })

        })

    }
}

module.exports = XF