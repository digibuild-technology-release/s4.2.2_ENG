const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();


const keycloakClientCredentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tokenUrl: process.env.TOKEN_URL,
};


router.post("/login", async (req, res) => {
    try {
        const username = req.body.email;
        const password = req.body.password;
        //console.log(username)
        //console.log(password)

        const response = await fetch(keycloakClientCredentials.tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=password&client_id=${keycloakClientCredentials.clientId}&client_secret=${keycloakClientCredentials.clientSecret}&clear&username=${username}&password=${password}`,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response from Keycloak:', errorResponse);
            return res.status(401).send({ message: 'Failed to obtain access token' });
        }

        const token = await response.json();
        console.log('Access token:', token);
        res.status(200).send({data:token,message:"Logged in successfully"});
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;