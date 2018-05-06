let fs = require('fs');
let AipSpeech = require('baidu-aip-sdk').speech
let client = new AipSpeech(11179923, 'U6rfAdLhqocdbpOgj5znGHeE', 'cff63d2814bfe7cfc3244eebc48e1b3c');

let voice = fs.readFileSync('../assets/16k_test.pcm');

let voiceBase64 = new Buffer(voice);

// 识别本地语音文件
client.recognize(voiceBase64, 'pcm', 16000).then(function(result) {
    console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});
// 识别远程语音文件
client.recognizeByUrl('http://bos.nj.bpc.baidu.com/v1/audio/8k.amr', 'http://yq01-ecom-holmes22-20150818112825.yq01.baidu.com:8492/aip/dump', 'amr', 8000).then(function(result) {
    console.log('语音识别远程音频文件结果: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});


