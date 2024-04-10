import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { OBJModel } from 'react-3d-viewer'

import DownloadButtonGBXML from '../components/downloadButtonXMl'
import DownloadButtonFile from '../components/downloadButtonFile'
import VisualizationGBXML from '../components/VisualizationGBXML';
import DownloadButtonBIM from '../components/downloadButtonBIM'
import DownloadButtonLCA from '../components/downloadButtonLCA'
import DownloadButtonElectricity from '../components/downloadButtonElectricity'
import DownloadButtonVentilation from '../components/downloadButtonVentilation'
import FloorTabs from '../components/floorTabs'
export default function Home({ setList, list }) {

  return (

    <Box sx={{ flexGrow: 1, minHeight: "78vh", marginTop: "1vh", marginBottom: "1vh" }}>
      <Paper elevation={0} sx={{ textAlign: "center", marginBottom: "1rem" }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontWeight: 700, marginTop: "1vh", padding: "1%" }}>
            Design and plans of the building
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ marginBottom: "1vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <FloorTabs />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ marginBottom: "1vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <DownloadButtonFile />
            </Grid>
          </Grid>
        </Box>
      </Container>
        {/* <Box>
          <Grid container spacing={2} justifyContent="center">
            <OBJModel
              src="/BIM_KYT_ARK_OPT_IFC4_brg.obj"
              width={800}
              height={800}
            />
          </Grid>
        </Box> */}
      <Paper elevation={0} sx={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontWeight: 700, marginTop: "1vh", padding: "1%" }}>
            BIM
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ marginBottom: "1vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
              <VisualizationGBXML />
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ marginBottom: "3vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <DownloadButtonBIM />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container style={{ marginBottom: '3vh' }}>
      <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
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
