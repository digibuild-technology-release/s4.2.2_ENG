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
import Popover from '@mui/material/Popover';

import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        "Comfort level(sPMV)":  "-0.06",
        'Thermal comfort(KPI)': "100%",
        "Predicted comfort level (24h)": "-0.051"  
    });
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

    const handlePopoverOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setHoveredRow(index);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredRow(null);
    };

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
                        {Object.keys(values).map((row, index) => {
                            // Verifica se la riga è la prima o la terza
                            const showPopover = index === 0 || index === 2 || index === 1;
                            let message;
                            if (index === 0) {
                                message = "The comfort level is calculated as simplified Predicted Mean Vote (sPMV) and it quantifies comfort starting from indoor temperatures and relative humidity.  ";
                            } else if (index === 1) {
                                message = "This metric is associated with the number of hours the occupant experiences thermal comfort.";
                            } else if (index === 2) {
                                message = "It represents the value of simplified Predicted Mean Vote (sPMV) of the next 24 hours.";
                            } else {
                                message = ""; // Gestisci tutti gli altri casi
                            }
                            
                            return (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onMouseEnter={showPopover ? (event) => handlePopoverOpen(event, index) : null}
                                    onMouseLeave={showPopover ? handlePopoverClose : null}
                                >
                                    <TableCell component="th" scope="row">
                                        {row}
                                    </TableCell>
                                    <TableCell align="right">{values[row]}</TableCell>
                                    {showPopover && (
                                        <Popover
                                            open={hoveredRow === index}
                                            anchorEl={anchorEl}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Typography sx={{ p: 2 }}>{message}</Typography>
                                        </Popover>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };
    


    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
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