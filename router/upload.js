var fs = require('fs')
var express = require('express')
var multer = require('multer')

var router = express.Router();
var upload = multer({dest :'upload_tmp/'})
let AipSpeech = require('baidu-aip-sdk').speech
let client = new AipSpeech(11179923, 'U6rfAdLhqocdbpOgj5znGHeE', 'cff63d2814bfe7cfc3244eebc48e1b3c');

var name ='null'
router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTION');
    res.send(name)
})
router.post('/',upload.any(),function (req,res,next){
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTION');
    console.log(req.files[0])



let voice = fs.readFileSync(req.files[0].path);
let voiceBase64 = new Buffer(voice);

// 识别本地语音文件
client.recognize(voiceBase64, 'wav', 16000).then(function(result) {
    console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.end(JSON.stringify(result))
}, function(err) {
    console.log(err);
});

    // var des_file ='./upload_tmp/'+ req.files[0].filename + '.wav'
    // fs.readFile(req.files[0].path,function(err,data){
    //     fs.writeFile(des_file, data, function(err){
    //         if( err){
    //             console.log(err)
    //         }else{
    //             response = {
    //                 message :'File upload success',
    //                 code:300,
    //                 filename: des_file
    //             };
    //             name = response.filename
    //             console.log(response);
    //             // res.end(JSON.stringify(response))
    //         }
    //     })
    // })
})
module.exports = router;