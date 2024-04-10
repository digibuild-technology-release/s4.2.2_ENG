import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import DownloadButtonLCA from '../components/downloadButtonLCA'
import DownloadButtonElectricity from '../components/downloadButtonElectricity'
import DownloadButtonVentilation from '../components/downloadButtonVentilation'
import DownloadButtonGenralBuilding from '../components/DownloadButtonGeneralBuiulding';
export default function Home({ setList, list }) {

  return (

    <Box sx={{ flexGrow: 1, minHeight: "78vh", marginTop: "10vh", marginBottom: "1vh" }}>
      <Container style={{ marginBottom: '3vh' }}>
      <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
      <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>General builing information-FVH pilot</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonGenralBuilding />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>Electricity Affected Areas</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonElectricity />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>Ventilation Affected Areas</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonVentilation />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>LCA Assesment (building phase) 2020</Typography>
        </Grid>
        <Grid item xs={8}>
          <DownloadButtonLCA />
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};
