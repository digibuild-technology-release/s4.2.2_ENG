const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();


const keycloakClientCredentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tokenUrl: process.env.TOKEN_URL,
    username: process.env.USERNAMEKEYCLOACK,
    password: process.env.PASSWORD
};

// Funzione per ottenere un token di accesso utilizzando le credenziali client
const getAccessToken = async () => {
    try {
        console.log(keycloakClientCredentials.username)
        console.log(keycloakClientCredentials.password)
        console.log(keycloakClientCredentials.clientId)
        const response = await fetch(keycloakClientCredentials.tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=password&client_id=${keycloakClientCredentials.clientId}&client_secret=${keycloakClientCredentials.clientSecret}&clear&username=${keycloakClientCredentials.username}&password=${keycloakClientCredentials.password}`,
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response from Keycloak:', errorResponse);
            throw new Error('Failed to obtain access token');
        }
        const data = await response.json();
        //console.log('Access token:', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        throw error;
    }
};

let dateStartNewElectricity = ''; // Dichiarazione globale di datestart
let dateEndNewElectricity = ''; // Dichiarazione globale di dateend
let dateStartNewHeating = ''; // Dichiarazione globale di datestart
let dateEndNewHeating = ''; // Dichiarazione globale di dateend 
let dateStartNewCooling = ''; // Dichiarazione globale di datestart
let dateEndNewCooling = ''; // Dichiarazione globale di dateend 
// Dichiarazione globale di dataMarts
let dataMartsElectricity = [
    {
      description: "Pilot 7 - Electricity historical data (datapointID: 134625)",
      query: "",
      identifier: "25890a4a-6"
    }
  ];

  let dataMartsHeating = [
    {
      description: "Pilot 7 - Heating historical data (datapointID: 134626)",
      query: "",
      identifier: "1ad7ab6e-0"
    }
  ];

  let dataMartsCooling = [
    {
      description: "Pilot 7 - Cooling historical data (datapointID: 134628)",
      query: "",
      identifier: "f77c6dba-1"
    } 
  ];
  
  

router.post('/api/DateStartAndDateendElectricity', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    dateStartNewElectricity = parseInt(req.body.dataFormattedStartElectricity);
    dateEndNewElectricity = parseInt(req.body.dataFormattedEndElectricity);
    dataMartsElectricity = [
        {
           description: "Pilot 7 - Electricity historical data (datapointID: 134625)",
           query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134625' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
           identifier: "25890a4a-6"
       }
   ];   
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.post('/api/DateStartAndDateendHeating', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
    try {
      dateStartNewHeating = parseInt(req.body.dataFormattedStartHeating);
      dateEndNewHeating = parseInt(req.body.dataFormattedEndHeating);
      dataMartsHeating = [
          {
             description: "Pilot 7 - Heating historical data (datapointID: 134626)",
             query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134626' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
             identifier: "1ad7ab6e-0"
         }
     ];    
    } catch (error) {
      // Handle any errors that may occur
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  router.post('/api/DateStartAndDateendCooling', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
    try {
      dateStartNewCooling = parseInt(req.body.dataFormattedStartCooling);
      dateEndNewCooling = parseInt(req.body.dataFormattedEndCooling);
      dataMartsCooling = [
        {
            description: "Pilot 7 - Cooling historical data (datapointID: 134628)",
            query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134628' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
            identifier: "f77c6dba-1"
        } 
     ];    
    } catch (error) {
      // Handle any errors that may occur
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  


/*  const dataMarts = [
     {
        description: "Pilot 7 - Electricity historical data (datapointID: 134625)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134625' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
        identifier: "25890a4a-6"
    }, 
     {
        description: "Pilot 7 - Heating historical data (datapointID: 134626)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134626' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
        identifier: "1ad7ab6e-0"
    },
    {
        description: "Pilot 7 - Cooling historical data (datapointID: 134628)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134628' AND fvh.public.f_tsdata.calendar_id BETWEEN ${dateStartNewElectricity} AND ${dateEndNewElectricity} ORDER BY fvh.public.f_tsdata.calendar_id ASC`,
        identifier: "f77c6dba-1"
    } 
]; */
/* const dataMarts = [
      {
        description: "Pilot 7 - Electricity historical data (datapointID: 134625)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134625'`,
        identifier: "25890a4a-6"
    }, 
     {
        description: "Pilot 7 - Heating historical data (datapointID: 134626)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134626' `,
        identifier: "1ad7ab6e-0"
    },
    {
        description: "Pilot 7 - Cooling historical data (datapointID: 134628)",
        query: `SELECT f_tsdata.calendar_id, f_tsdata.f_value FROM fvh.public.f_tsdata WHERE fvh.public.f_tsdata.sensor_id = '134628'`,
        identifier: "f77c6dba-1"
    } 
];  */

const executeDataMart = async (dataMarts, token) => {
    try {
        const response = await axios.post('https://digibuild.epu.ntua.gr/data_sharing/federated_querying/execute_datamart/', {
            query_identifier: dataMarts.identifier
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        //console.log('executeDataMart',response.data);
        return response.data;
    } catch (error) {
        console.error('Errore durante l\'esecuzione del datamart:', error);
    }
};

const executeQuery = async (dataMarts, token) => {
    try {
        const response = await axios.post('https://digibuild.epu.ntua.gr/data_sharing/federated_querying/execute_query/', {
            query: dataMarts.query
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        //console.log('executeQuery', response.data);
        return response.data;
    } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
    }
};

router.get("/api/historicalData", async (req, res) => {
    try {
        const token = await getAccessToken();
        console.log(`date start: ${dateStartNewElectricity}`);
        console.log(`date end: ${dateEndNewElectricity}`);
        console.log(dataMartsElectricity)
        const queryResponses = await Promise.all(dataMartsElectricity.map(async (dataMartsElectricity) => {
            const queryResponse = await executeQuery(dataMartsElectricity, token);
            console.log('query',queryResponse);
            return queryResponse;
        }));
        
        res.status(200).json({
            //dataMart: dataMartResponses,
            query: queryResponses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/api/historicalDataHeating", async (req, res) => {
    try {
        const token = await getAccessToken();
        console.log(`date start: ${dateStartNewHeating}`);
        console.log(`date end: ${dateEndNewHeating}`);
        console.log(dataMartsHeating)
        const queryResponses = await Promise.all(dataMartsHeating.map(async (dataMartsHeating) => {
            const queryResponse = await executeQuery(dataMartsHeating, token);
            console.log('query',queryResponse);
            return queryResponse;
        }));
        
        res.status(200).json({
            //dataMart: dataMartResponses,
            query: queryResponses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/api/historicalDataCooling", async (req, res) => {
    try {
        const token = await getAccessToken();
        console.log(`date start: ${dateStartNewCooling}`);
        console.log(`date end: ${dateEndNewCooling}`);
        console.log(dataMartsCooling)
        const queryResponses = await Promise.all(dataMartsCooling.map(async (dataMartsCooling) => {
            const queryResponse = await executeQuery(dataMartsCooling, token);
            console.log('query',queryResponse);
            return queryResponse;
        }));
        
        res.status(200).json({
            //dataMart: dataMartResponses,
            query: queryResponses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



