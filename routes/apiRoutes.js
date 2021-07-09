const config = require('../config/config');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

function onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('sap-client', config.sap.client);
}

const options = {
    selfHandleResponse: true,
    target: config.sap.host,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    // router:
    agent: config.sap.httpsAgent,
    logLevel: config.env === 'development' ? 'debug' : 'silent',
    onProxyReq: onProxyReq,
    onProxyRes: responseInterceptor(async (resBuffer, proxyRes, req, res) => {
        const response = resBuffer.toString('utf-8');
        //Replace internal host
        const regex = new RegExp(config.sap.host, "gi");
        return response.replace(regex, '/api');
    })

};

module.exports = createProxyMiddleware(options);
