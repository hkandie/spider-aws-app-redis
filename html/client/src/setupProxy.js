const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/',
        createProxyMiddleware({
            target: 'http://rx-powet-prod.cmcloudlab1000.info/',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api/': '/api/'
            }
        })
    );
};