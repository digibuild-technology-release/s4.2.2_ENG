import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AuthService from '../services/auth';
import AdministrativeInformation from '../pages/administrativeInformation'
import GeneralBuildingInformation from '../pages/generalBuildingInformation'
import BuildingMaterialInventory from '../pages/BuildingMaterialInventory'
import BuildingEnvelope from '../pages/buildingEnvelope'
import TechnicalBuildingSystem from '../pages/technicalBuildingSystem'
import BuildingPerformance from '../pages/buildingPerformance'
import BuildingDocumentationBIM from '../pages/buildingDocumentationBIM'
import Documentation from '../pages/Documentation'
import BIM from '../pages/BIM'
import DesignAndPlansOfTheBuilding from '../pages/DesignAndPlansOfTheBuilding'
import ConsumptiondataofenergyForecasting from '../pages/Consumptiondataofenergy(forecasting)'
import ConsumptiondataofenergyHistorical from '../pages/Consumptiondataofenergy(historical)'
import ConsumptiondataofenergyInvoices from '../pages/Consumptiondataofenergy(invoices)'
import Informationonoccupancy from '../pages/Informationonoccupancy'
import ComfortEwellbeing from '../pages/Comfort&well-being'
//import Prova from '../pages/prova'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    //console.log(props)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            //hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Dashboard() {
    const [value, setValue] = useState(0);
    const [valuesub, setValueSub] = useState(0);
    const [valueSubSub, setValueSubSub] = useState(0);
    const [valuesub2, setValueSub2] = useState(0);
    const [valueSubSub2, setValueSubSub2] = useState(0);
    const [valuesub3, setValueSub3] = useState(0);
    const [valueSubSub3, setValueSubSub3] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setValueSub(0);
        setValueSubSub(0);
        setValueSub2(0);
        setValueSubSub2(0);
        setValueSub3(0);
        setValueSubSub3(0);
    };

    const handleChange1 = (event, newValue) => {
        setValueSub(newValue);
        setValueSubSub(0);
    };

    const handleChange2 = (event, newValue) => {
        setValueSub2(newValue);
        setValueSubSub2(0);
    };

    const handleChange3 = (event, newValue) => {
        setValueSub3(newValue);
        setValueSubSub3(0);
    };

  /*   const [userRole, setUserRole] = useState("");
    const [userDblStructure, setUserDblStructure] = useState("");

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserRole(AuthService.getRole());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    useEffect(() => {
        // Nel componente dove hai bisogno della struttura
        setUserDblStructure(AuthService.getDblStructure());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

 */
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                            <Tab label={<Typography variant="body1" fontWeight="bold">Administrative Information</Typography>} {...a11yProps(0)} />
                            <Tab label={<Typography variant="body1" fontWeight="bold">General Building Information</Typography>} {...a11yProps(1)} />
                            <Tab label={<Typography variant="body1" fontWeight="bold">Building Element Information</Typography>} {...a11yProps(2)} />
                            <Tab label={<Typography variant="body1" fontWeight="bold">Building Operation and Use</Typography>} {...a11yProps(3)} />
                            <Tab label={<Typography variant="body1" fontWeight="bold">Building Performance</Typography>} {...a11yProps(4)} />
                            <Tab label={<Typography variant="body1" fontWeight="bold">Building Documentation</Typography>} {...a11yProps(5)} /> {/* Building Documentation BIM */}
                            {/* <Tab label={<Typography variant="body1" fontWeight="bold">Bprova</Typography>} {...a11yProps(6)} /> {/* Building Documentation BIM */} */}
                        </Tabs>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={0}>
                        <AdministrativeInformation />
                    </TabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={1}>
                        <GeneralBuildingInformation />
                    </TabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={2}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                            <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { flex: '1', margin: '0 10px', fontWeight: 'bold', textAlign: 'center' } }}>
                                <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                <Tab label="Building envelope" {...a11yProps(1)} />
                                <Tab label="Technical building system" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={valuesub} index={0}>
                            <BuildingMaterialInventory />
                        </TabPanel>
                        <TabPanel value={valuesub} index={1}>
                            <BuildingEnvelope />
                        </TabPanel>
                        <TabPanel value={valuesub} index={2}>
                            <TechnicalBuildingSystem />
                        </TabPanel>
                    </TabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { flex: '1', textAlign: 'center', fontWeight: 'bold' } }}>
                                <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                <Tab label="Information on occupancy" {...a11yProps(3)} />
                                <Tab label="Comfort & well-being" {...a11yProps(4)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={valuesub2} index={0}>
                            <ConsumptiondataofenergyForecasting />
                        </TabPanel>
                        <TabPanel value={valuesub2} index={1}>
                            <ConsumptiondataofenergyInvoices />
                        </TabPanel>
                        <TabPanel value={valuesub2} index={2}>
                            <ConsumptiondataofenergyHistorical />
                        </TabPanel>
                        <TabPanel value={valuesub2} index={3}>
                            <Informationonoccupancy />
                        </TabPanel>
                        <TabPanel value={valuesub2} index={4}>
                            <ComfortEwellbeing />
                        </TabPanel>
                    </TabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={4}>
                        <BuildingPerformance />
                    </TabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={5}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example" sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { flex: '1', fontWeight: 'bold', textAlign: 'center' } }}>
                                <Tab label="Design and plans of the building" {...a11yProps(0)} />
                                <Tab label="Documentation" {...a11yProps(1)} />
                                <Tab label="BIM" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={valuesub3} index={0}>
                            <DesignAndPlansOfTheBuilding />
                        </TabPanel>
                        <TabPanel value={valuesub3} index={1}>
                            <Documentation />
                        </TabPanel>
                        <TabPanel value={valuesub3} index={2}>
                            <BIM />
                        </TabPanel>
                    </TabPanel>
                    {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={6}>
                        <Prova />
                    </TabPanel>
                </Grid> */}
                </Grid>
                {/* <Grid item xs={12}>
                            <TabPanel value={value} index={5}>
                                 <BuildingDocumentationBIM /> 
                            </TabPanel>
                        </Grid> */}
            </Grid>
        </Box>
    );
}