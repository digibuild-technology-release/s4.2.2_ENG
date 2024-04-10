import React, { useEffect, useState } from 'react';
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

import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        "Number of occupants":  "Number",
        'Functions': "Descriptive",
        'Measured heating consumption': "kWh/year",
        'Measured electricity consumption ': "kWh/year",
        'Measured hot water consumption ': "Litres/year",
        'Dynamic heating consumption ': "kWh/year",
        'Dynamic electricity consumption ': "kWh/year",
        'Renewable energy production': "kWh/year",
        'Behavioural insights': "Descriptive"
    });
    function getRandom(max) {
        return (Math.random() * max);
    }

    /* useEffect(() => {
        setTimeout(() => {
            setValues({
                "Unique building identifier": getRandom(100),
                'Address': getRandom(100),
                'Building owner': getRandom(100),
                'DBL prepared by': getRandom(100),
                'When was the DBL last edited': getRandom(100),
                'Ownership type': getRandom(100),
                'Tenancy agreement': getRandom(100),
                'Utilities contracts': getRandom(100),
                'Maintenance service contact': getRandom(100),
                'Insurance documents': getRandom(100),
                'Maintenance log': getRandom(100),
                'Licenses': getRandom(100),
                'Sbuilding type': getRandom(100),
                'Building name': getRandom(100),
                'Ownership': getRandom(100)
            });
        }, 2000);
        // Update count to be 5 after timeout is scheduled
        //console.log(Object.keys(values));
    }, [values]);
 */

    const table = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(values).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{values[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            {/* <Box sx={{ flexGrow: 1, minHeight: "90vh" }}> */}
            <Paper elevation={0}
                sx={{ textAlign: "center" }} >
                <Container maxWidth="xl">
                    <Typography variant="h4"
                        sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontWeight: 700, marginTop: "1vh", padding: "1%" }}>
                        Ownership information
                    </Typography>
                </Container>
            </Paper>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <UploadButton />
                        </Grid>
                        <Grid item>
                            <DownloadButton />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table()}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}