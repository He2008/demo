const express = require('express')
const app = express();
const path = require('path')

const upload = require('./router/upload')
const wechat =require('./router/wechat')

app.use(express.static(path.join(__dirname, 'public')))

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