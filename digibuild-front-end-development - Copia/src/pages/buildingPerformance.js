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
import DownloadButtonEnergyPerformance from '../components/downloadButtonEnergyPerformance'
import DownloadButtonBreeam from '../components/downloadButtonBreeam'
import DownloadButtonSRICertificate from '../components/downloadButtonSRICertificate'
import DownloadButtonSRIResults from '../components/downloadButtonSRIResults'
import { Height } from '@mui/icons-material';

export default function Home({ setList, list }) {


  return (
    <Container style={{ marginBottom: '50vh', marginTop: '10vh' }}>
      <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>BREEAM</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonBreeam />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>SRI Certificate</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonSRICertificate />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>SRI Results & certificate</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonSRIResults />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>Energy performance certificate</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonEnergyPerformance />
        </Grid>
        {/* <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>EUB SuperHub certification</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonFile />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center', backgroundColor:'yellow' }}>Information on renovation potential</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6"></Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center', backgroundColor:'yellow' }}>Efficient and Climate Resilient Building</Typography>
        </Grid> */}
      </Grid>
    </Container>
  );
};
