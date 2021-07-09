const express = require('express');
const axios = require('axios');
const qs = require('qs');
const config = require('../config/config');


const router = express.Router();


router.post('/login', (req, res, next) => {
    const { code, code_verifier } = req.body;
    //Request token from code
    axios.post(
        `${config.sap.host}${config.sap.tokenPath}`,
        qs.stringify({
            grant_type: 'authorization_code',
            response_type: 'token',
            client_id: config.sap.tokenClientId,
            redirect_uri: config.sap.tokeRedirectUri,
            code: code,
            code_verifier: code_verifier
        }),
        {
            auth: {
                username: config.sap.tokenUser,
                password: config.sap.tokenPass,
            },
            httpsAgent: config.sap.httpsAgent,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    ).then((response) => {
        //console.log(response);
        res.json(response.data);
    }).catch((err) => {
        //console.log(err);
        res.status(400).json(err.response.data);
    });
});



module.exports = router;