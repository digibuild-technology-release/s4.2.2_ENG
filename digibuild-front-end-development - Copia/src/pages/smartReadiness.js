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

import DownloadButtonFile from '../components/downloadButtonFile'
import { Height } from '@mui/icons-material';

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        "Unique building identifier": 0,
        'Address': 0,
        'Building owner': 0,
        'DBL prepared by': 0,
        'When was the DBL last edited': 0,
        'Ownership type': 0,
        'Tenancy agreement': 0,
        'Utilities contracts': 0,
        'Maintenance service contact': 0,
        'Insurance documents': 0,
        'Maintenance log': 0,
        'Licenses': 0,
        'Sbuilding type': 0,
        'Building name': 0,
        'Ownership': 0
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
    }, [values]); */


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
        <Container style={{ marginBottom: '54vh', marginTop: '10vh' }}>
      <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>BREEAM</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonFile />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>SRI</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonFile />
        </Grid>
      </Grid>
    </Container>
    );
  };
