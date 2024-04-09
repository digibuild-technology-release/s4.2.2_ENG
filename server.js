require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const fetch = require('node-fetch');
const axios = require('axios');
const historicalData = require('./pages/historicalData')
const FormData = require('form-data');
const fs = require('fs');


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use(historicalData);

/*async function postData() {
    try {
      const response = await fetch('https://api.digibuild-demo.eu/fvh_predict', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // Aggiungi eventuali altre intestazioni qui
        },
        body: JSON.stringify({
          // Inserisci qui eventuali dati da inviare nel corpo della richiesta
        })
      });
  
      const responseData = await response.json();
      console.log('Risposta:', responseData);
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
    /*try {
    console.log('ciao')
     // Read the file as a stream
     const fileStream = fs.createReadStream('input_fvh_api.csv');

    // Create a formData object and append the file to it
    const formData = new FormData();
    formData.append('file', fileStream);

    // Define the headers
    const headers = {
      'Accept': 'application/json',
      ...formData.getHeaders() // Ottieni gli header da FormData, includendo il boundary
    }; 

    const response = await fetch('https://api.digibuild-demo.eu/calculate_comfort_fvh', {
      method: 'POST',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log('Response:', data);
  
  } catch (error) {
    console.error('Error:', error);
  }
}*/
//postData();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

