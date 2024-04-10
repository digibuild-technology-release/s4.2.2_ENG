
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'
import FloorTabs from '../components/floorTabs'

export default function AccordionWithTable() {
    const [valuesFloor0, setValuesFloor0] = useState({
        "A":  "https://cloud2.digibuild-project.com/file/c4286a0b-20aa-4c68-9471-d3b33a0e842a/download",
        'B': "https://cloud2.digibuild-project.com/file/4ae2b1c2-b9e2-459b-9db1-e8bbcf079246/download",
        "C": "https://cloud2.digibuild-project.com/file/2eab78fe-e88d-4f48-ba19-78491d6eae87/download"  
    });
    const [valuesFloor1, setValuesFloor1] = useState({
        "A":  "https://cloud2.digibuild-project.com/file/f3b2d314-da87-4186-a2cf-2368f2824aa2/download",
        'B': "https://cloud2.digibuild-project.com/file/b47289e3-872f-43b1-b355-73c5bd2cb76e/download",
        "C": "https://cloud2.digibuild-project.com/file/5af6eff2-5ace-4396-833b-764528d08e9c/download"  
    });
    const [valuesFloor2, setValuesFloor2] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });
    const [valuesFloor3, setValuesFloor3] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });
    const [valuesFloor4, setValuesFloor4] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });
    const [valuesFloor5, setValuesFloor5] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });
    const [valuesFloor6, setValuesFloor6] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });
    const [valuesFloor7, setValuesFloor7] = useState({
        "A":  "Link",
        'B': "Link",
        "C": "Link"  
    });

    const table0 = () => {
        return (
            <TableContainer component={Paper} style={{ width: '80vh' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(valuesFloor0).map(([key, value]) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '5vh' }}
                            >
                                <TableCell component="th" scope="row">
                                    {key}
                                </TableCell>
                                <TableCell align="right">
                                    {typeof value === 'string' && value.startsWith('http') ? 
                                        <a href={value}>{value}</a> : 
                                        value
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table1 = () => {
        return (
            <TableContainer component={Paper} style={{ width: '80vh' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(valuesFloor1).map(([key, value]) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '5vh' }}
                            >
                                <TableCell component="th" scope="row">
                                    {key}
                                </TableCell>
                                <TableCell align="right">
                                    {typeof value === 'string' && value.startsWith('http') ? 
                                        <a href={value}>{value}</a> : 
                                        value
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table2 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor2).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor2[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table3 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor3).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor3[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table4 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor4).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor4[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table5 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor5).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor5[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table6 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor6).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor6[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const table7 = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesFloor7).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{valuesFloor7[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const accordionItemStyle = {
        minHeight: '5vh', // Altezza minima delle righe dell'accordione impostata a 60px
    };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 0
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table0()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 1
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table1()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 2
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table2()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 3
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table3()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 4
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table4()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 5
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table5()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 6
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table6()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={accordionItemStyle}
        >
          Floor 7
        </AccordionSummary>
        <AccordionDetails>
         <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table7()}
                    </Grid>
                </Box>
            </Container>
        </AccordionDetails>
        </Accordion>
    </div>
  );
}
