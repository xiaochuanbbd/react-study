const {createProxyMiddleware: proxy} =require('http-proxy-middleware');

// 暴露一个module出去
module.exports = function (app){
    app.use(
        proxy('/api1',{//apis遇见这个前缀请求就是会走代理
           target:'http://localhost:5001',
           changeOrigin:true,// 控制服务器收到的请求头host字段的值，让服务器以为是自己的端口发的请求
            pathRewrite: {'^/api1': '',},//重写请求路径
        }),
        proxy('/api2',{
            target:'http://localhost:5002',
            changeOrigin:true,
            pathRewrite: {'^/api2': '',},
        }),
    )
}
 