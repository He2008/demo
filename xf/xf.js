const crypto = require('crypto');
const axios = require('axios')
const util = require('util')
const fs = require('fs')

let md5Sign = function (data) {
    var md5 = crypto.createHash('md5').update(data).digest('hex');
    return md5;
}

class XF {
    constructor(config) {
        this.config = {
            app_id: '1106818817',
            apiKey: 'JgDX9Iu7ySFh1doW'
        }
    }
    getSign(params){
        let dicObj = Object.keys(params).sort()
        let str=''
        for(let item in dicObj){
            let key = dicObj[item]
            if(params[key]){
                str+=`${key}=${encodeURI(params[key])}&`
            }
        }
        str+= `app_key=${this.config.apiKey}`
        return md5Sign(str).toUpperCase()
    }
    postApi(voice) {
        return new Promise((reslove, reject) => {
            let curTime = (Date.parse(new Date()).toString()).split('000')[0]
            let audio = voice;
            let params = {
                app_id: this.config.app_id*1,
                time_stamp:curTime*1,
                nonce_str:'fa577ce340859f9fe11',
                sign:'',
                format:2,
                speech:audio,
            }
     
            params.sign = this.getSign(params);
            console.log(params)
            axios.post('https://api.ai.qq.com/fcgi-bin/aai/aai_asr',params,{
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                },
            }).then(res => {
                reslove(res)
            }).catch(err => {
                reject(err)
            })

        })

    }
}

module.exports = XF