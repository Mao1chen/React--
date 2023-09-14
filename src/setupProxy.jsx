const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/dev", {
      target: "http://127.0.0.1:7100",
      changeOrigin: true,
      pathRewrite: { "^/dev": "" },
    })
  );
};
