const express = require('express')
const app = express();
const path = require('path')

const upload = require('./router/upload')
const wechat =require('./router/wechat')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

// 设置请求头
// application/json  接口返回json数据
// charset=utf-8 解决json数据中中文乱码
// app.use("*", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
//     next();
// });

app.use('/upload', upload)
app.use('/wechat', wechat)
app.get('/', (req, res) => {
    res.send('e')
})

let server = app.listen(8085, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`start ${host}:${port}`)
})