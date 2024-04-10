import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import moment from 'moment';
import Chart from 'chart.js/auto';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';


import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'
import chart from '../components/chart'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
  };

  const API_URL_DATE_Eletricity = config.host + "/DateStartAndDateendElectricity";
  const API_URL_DATE_Heating = config.host + "/DateStartAndDateendHeating";
  const API_URL_DATE_Cooling = config.host + "/DateStartAndDateendCooling";
  const API_URL_Eletricity = config.host + "/historicalData";
  const API_URL_Heating = config.host + "/historicalDataHeating";
  const API_URL_Cooling = config.host + "/historicalDataCooling";

export default function Home({ setList, list }) {

    const [selectedDateEletricityStart, setSelectedDateEletricityStart] = React.useState(null);
    const [selectedDateEletricityEnd, setSelectedDateEletricityEnd] = React.useState(null);
    const [selectedDateHeatingStart, setSelectedDateHeatingStart] = React.useState(null);
    const [selectedDateHeatingEnd, setSelectedDateHeatingEnd] = React.useState(null);
    const [selectedDateCoolingStart, setSelectedDateCoolingStart] = React.useState(null);
    const [selectedDateCoolingEnd, setSelectedDateCoolingEnd] = React.useState(null);
    const [failMessage, setFailMessage] = useState(false)
    
    const handleDateChangeEletricityStart = (dateEletricityStart) => {
        setSelectedDateEletricityStart(dateEletricityStart);
    };
    const handleDateChangeEletrecityEnd = (dateEletricityEnd) => {
        setSelectedDateEletricityEnd(dateEletricityEnd);
    };
    const handleDateChangeHeatingStart = (dateHeatingStart) => {
        setSelectedDateHeatingStart(dateHeatingStart);
    };
    const handleDateChangeHeatingEnd = (dateHeatingEnd) => {
        setSelectedDateHeatingEnd(dateHeatingEnd);
    };
    const handleDateChangeCoolingStart = (dateCoolingStart) => {
        setSelectedDateCoolingStart(dateCoolingStart);
    };
    const handleDateChangeCoolingEnd = (dateCoolingEnd) => {
        setSelectedDateCoolingEnd(dateCoolingEnd);
    };



    const [values, setValues] = useState({
        'Measured heating consumption': "kWh/year",
        'Measured electricity consumption ': "kWh/year",
        'Measured cooling consumption ': "Litres/year",
    });

    const [electricityTimeStamp, setElectricityTimeStamp] = useState(null)
    const [electricityValue, setElectricityValue] = useState(null)
    const [heatingTimeStamp, setHeatingTimeStamp] = useState(null)
    const [heatingValue, setHeatingValue] = useState(null)
    const [coolingTimeStamp, setCoolingTimeStamp] = useState(null)
    const [coolingValue, setCoolingValue] = useState(null)

    const sendDateStartAndDateEndElectricityToBackend = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
        const dataFormattedStartElectricity = selectedDateEletricityStart.format('YYYYMMDDHHmm');
        const dataFormattedEndElectricity = selectedDateEletricityEnd.format('YYYYMMDDHHmm');
        console.log(dataFormattedEndElectricity)
        console.log(API_URL_DATE_Eletricity)
        fetch(API_URL_DATE_Eletricity, { //collegamento back-end
            method: 'POST',
            body: JSON.stringify({ dataFormattedStartElectricity, dataFormattedEndElectricity }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                // Gestisci gli errori se necessario
                console.error(error);
            });
    }

    const sendDateStartAndDateEndHeatingToBackend = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
        const dataFormattedStartHeating = selectedDateHeatingStart.format('YYYYMMDDHHmm');
        const dataFormattedEndHeating = selectedDateHeatingEnd.format('YYYYMMDDHHmm');
        console.log(dataFormattedEndHeating)
        fetch(API_URL_DATE_Heating, { //collegamento back-end
            method: 'POST',
            body: JSON.stringify({ dataFormattedStartHeating, dataFormattedEndHeating }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                // Gestisci gli errori se necessario
                console.error(error);
            });
    }

    const sendDateStartAndDateEndCoolingToBackend = () => { //funzione per mandare i dati al back-end per la select, menu a tendina
        const dataFormattedStartCooling = selectedDateCoolingStart.format('YYYYMMDDHHmm');
        const dataFormattedEndCooling = selectedDateCoolingEnd.format('YYYYMMDDHHmm');
        console.log(dataFormattedEndCooling)
        fetch(API_URL_DATE_Cooling, { //collegamento back-end
            method: 'POST',
            body: JSON.stringify({ dataFormattedStartCooling, dataFormattedEndCooling }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                // Gestisci gli errori se necessario
                console.error(error);
            });
    }

    const handleSubmitClickElectricity = async () => { //funzione per riempire il charter con il bottone search
        try {
          /* if (selectedDateEletricityStart === '' || selectedDateEletricityEnd === '') {
            setFailMessage(true);
          } else {
            setFailMessage(false); */
            console.log(API_URL_Eletricity)
            const response = await fetch(API_URL_Eletricity, { // Utilizza l'URL corretto per la tua API
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                console.log(responseData)
                let tempDateTimeElectricity = [];
                let tempValueElectricity = [];
                let electricity = responseData.query[0]; // Assegna direttamente responseData.dataMart[0] a electricity

                electricity.forEach((element) => {
                    // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                    tempDateTimeElectricity.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                    tempValueElectricity.push(element[1]);
                });
                setElectricityTimeStamp(tempDateTimeElectricity);
                setElectricityValue(tempValueElectricity);
        } catch (error) {
          // handle network error
          console.log(error);
          const errorResponse = {
            status: 503,
            message: "ERR_NETWORK",
          };
          return errorResponse;
        }
      }

      const handleSubmitClickHeating = async () => { //funzione per riempire il charter con il bottone search
        try {
          /* if (selectedDateEletricityStart === '' || selectedDateEletricityEnd === '') {
            setFailMessage(true);
          } else {
            setFailMessage(false); */
            const response = await fetch(API_URL_DATE_Heating, { // Utilizza l'URL corretto per la tua API
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                console.log(responseData)
                let tempDateTimeHeating = [];
                let tempValueHeating = [];
                let heating = responseData.query[0]; // Assegna direttamente responseData.dataMart[0] a electricity

                heating.forEach((element) => {
                    // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                    tempDateTimeHeating.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                    tempValueHeating.push(element[1]);
                });
                setHeatingTimeStamp(tempDateTimeHeating);
                setHeatingValue(tempValueHeating);
        } catch (error) {
          // handle network error
          console.log(error);
          const errorResponse = {
            status: 503,
            message: "ERR_NETWORK",
          };
          return errorResponse;
        }
      }

      const handleSubmitClickCooling = async () => { //funzione per riempire il charter con il bottone search
        try {
          /* if (selectedDateEletricityStart === '' || selectedDateEletricityEnd === '') {
            setFailMessage(true);
          } else {
            setFailMessage(false); */
            const response = await fetch(API_URL_Cooling, { // Utilizza l'URL corretto per la tua API
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                console.log(responseData)
                let tempDateTimeCooling = [];
                let tempValueCooling = [];
                let cooling = responseData.query[0]; // Assegna direttamente responseData.dataMart[0] a electricity
                console.log(cooling)

                cooling.forEach((element) => {
                    // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                    tempDateTimeCooling.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                    tempValueCooling.push(element[1]);
                });
                setCoolingTimeStamp(tempDateTimeCooling);
                setCoolingValue(tempValueCooling);
        } catch (error) {
          // handle network error
          console.log(error);
          const errorResponse = {
            status: 503,
            message: "ERR_NETWORK",
          };
          return errorResponse;
        }
      }

    //inizio codice per lo chart
    const chartRefEletrecity = useRef(null)
    const chartInstanceEletrecity = useRef(null)
    useEffect(() => {
        if (chartInstanceEletrecity.current) {
            chartInstanceEletrecity.current.destroy();
        }
        const myChartRefEletrecity = chartRefEletrecity.current.getContext("2d");
        chartInstanceEletrecity.current = new Chart(myChartRefEletrecity, {
            type: "line",
            data: {
                labels: electricityTimeStamp,
                datasets: [{
                    label: 'Eletricity (kwh)',
                    data: electricityValue,
                    fill: false,
                    backgroundColor: "white", //colore punti
                    borderColor: 'blue', //colore linea
                    PointBorderColour: 'red',
                    borderWidth: 2,
                    responsive: true
                }]
            }
        })
        return () => {
            if (chartInstanceEletrecity.current) {
                chartInstanceEletrecity.current.destroy();
            }
        }
    }, [electricityTimeStamp, electricityValue])

    const chartRefHeating = useRef(null)
    const chartInstanceHeating = useRef(null)

    useEffect(() => {
        if (chartInstanceHeating.current) {
            chartInstanceHeating.current.destroy();
        }
        const myChartRefHeating = chartRefHeating.current.getContext("2d");
        chartInstanceHeating.current = new Chart(myChartRefHeating, {
            type: "line",
            data: {
                labels: heatingTimeStamp,
                datasets: [{
                    label: 'Heating (kwh)',
                    data: heatingValue,
                    fill: false,
                    backgroundColor: "white", //colore punti
                    borderColor: 'blue', //colore linea
                    PointBorderColour: 'red',
                    borderWidth: 2,
                    responsive: true
                }]
            }
        })
        return () => {
            if (chartInstanceHeating.current) {
                chartInstanceHeating.current.destroy();
            }
        }
    }, [heatingTimeStamp, heatingValue])

    const chartRefCooling = useRef(null)
    const chartInstanceCooling = useRef(null)
    useEffect(() => {
        if (chartInstanceCooling.current) {
            chartInstanceCooling.current.destroy();
        }
        const myChartRefCooling = chartRefCooling.current.getContext("2d");
        chartInstanceCooling.current = new Chart(myChartRefCooling, {
            type: "line",
            data: {
                labels: coolingTimeStamp,
                datasets: [{
                    label: 'DistrictCooling (kwh)',
                    data: coolingValue,
                    fill: false,
                    backgroundColor: "white", //colore punti
                    borderColor: 'blue', //colore linea
                    PointBorderColour: 'red',
                    borderWidth: 2,
                    responsive: true
                }]
            }
        })
        return () => {
            if (chartInstanceCooling.current) {
                chartInstanceCooling.current.destroy();
            }
        }
    }, [coolingTimeStamp, coolingValue])




    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            {/* <Box sx={{ flexGrow: 1, minHeight: "90vh" }}> */}
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateEletricityStart}
                                        onChange={handleDateChangeEletricityStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateEletricityEnd}
                                        onChange={handleDateChangeEletrecityEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={() => { sendDateStartAndDateEndElectricityToBackend(), handleSubmitClickElectricity() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                          {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <canvas ref={chartRefEletrecity} /* style={{ width: '200px', height: '100px' }} */ />
                    </Grid>
                </Box>
            </Container>
            
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateHeatingStart}
                                        onChange={handleDateChangeHeatingStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateHeatingEnd}
                                        onChange={handleDateChangeHeatingEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={() => { sendDateStartAndDateEndHeatingToBackend(), handleSubmitClickHeating() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                          {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <canvas ref={chartRefHeating} /* style={{ width: '200px', height: '100px' }} */ />
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateCoolingStart}
                                        onChange={handleDateChangeCoolingStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateCoolingEnd}
                                        onChange={handleDateChangeCoolingEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={() => { sendDateStartAndDateEndCoolingToBackend(), handleSubmitClickCooling() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                          {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        <canvas ref={chartRefCooling} /* style={{ width: '200px', height: '100px' }} */ />
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}