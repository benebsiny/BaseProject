const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');
const hbs = require('koa-hbs');
// const {getJSON} = require('jquery');
const {createReadStream, readFile} = require('fs')

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
    // var news_title, news_detail_title, news_detail_img, news_source, news_time;
    // var news;
    // readFile('./src/web/news.json', "utf-8", (err, data)=>{
    //     // console.log(data);
    //     news = data;
    // });

    // var jsonn;
    // let interval = setInterval(()=>{
    //     if(news!=undefined){
    //         jsonn = JSON.parse(news)
    //         console.log(jsonn);
    //         clearInterval(interval);
    //     }
    // }, 1);
    
    // for(let i=0; i<7; i++)
    //     console.log(parsedData[i]['title']);
    
    // getJSON('./src/web/news.json')
    // getJSON('./src/web/news.json', (data)=>{
    // new_title = data[0]['title'];
    // new_detail_title = data[0]['content'];
    // new_detail_img = data[0]['image'];
    // new_source = data[0]['source'];
    // new_time = data[0]['time']; 
    // })

    ctx.type = 'html'
    ctx.body = createReadStream('./src/web/news_detail.html');
})

app.use(router.routes());
app.listen(port, host, ()=>console.log(`http://${host}:${port}`));
