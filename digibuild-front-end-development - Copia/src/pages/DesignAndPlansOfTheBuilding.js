import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import FloorTabs from '../components/floorTabs'
export default function Home({ setList, list }) {

  return (

    <Box sx={{ flexGrow: 1, minHeight: "78vh", marginTop: "5vh", marginBottom: "1vh" }}>
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
    </Box>
  );
};
