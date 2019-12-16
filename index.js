const Koa = require('koa');
const static = require('koa-static');
const {createReadStream} = require('fs')
const app = new Koa();

const host = '127.0.0.1';
const port = 3000;

app.use(static('./src/web'))

app.use(async(ctx, next)=>{
    ctx.type = 'html'
    ctx.body = createReadStream('./src/web/index.html');
})

app.listen(port, host, ()=>console.log(`http://${host}:${port}`))
