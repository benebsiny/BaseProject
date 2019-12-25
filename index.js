const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');
const hbs = require('koa-hbs');
const $ = require('jquery');
const {createReadStream} = require('fs')

const app = new Koa();
const router = new Router();

const host = '127.0.0.1';
const port = 3000;

app.use(static('./src/web'))
app.use(hbs.middleware({
    viewPath: `${__dirname}\\src\\web`
}))

router.get('/', (ctx, next)=>{
    ctx.type = 'html'
    ctx.body = createReadStream('./src/web/index.html');
})

router.get('/:id', async(ctx, next)=>{
    const {id} = ctx.params;
    
    const data = {
        title: 'Welcome',
    }
    await ctx.render('news', data);
})

app.use(router.routes());
app.listen(port, host, ()=>console.log(`http://${host}:${port}`));
