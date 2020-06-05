const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use("/songshu",createProxyMiddleware({
      target:"http://m.3songshu.com",
      changeOrigin:true,
      pathRewrite:{
          "^/songshu":""
      },
      secure:false
  }));
  app.use("/api",createProxyMiddleware({
    target:"http://localhost:8089",
    changeOrigin:true,
    pathRewrite:{
        '^/api':''
    },
    secure:false
}));
}