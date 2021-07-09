// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const https = require('https');


const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.SERVER_PORT || 3000,
    sap: {
        host: process.env.SAP_HOST || 'https://sapght1.epfl.ch:44330',
        client: process.env.SAP_CLIENT || '500',
        tokenPath: process.env.TOKEN_PATH || '/sap/bc/sec/oauth2/token/',
        tokenUser: process.env.TOKEN_USER || '',
        tokenPass: process.env.TOKEN_PASS || '',
        tokenClientId: process.env.TOKEN_CLIENT_ID || 'DEMOGTA',
        tokeRedirectUri: process.env.TOKEN_REDIRECT_URI || 'https://localhost:4200/callback',
        //TODO
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }
};

module.exports = config;