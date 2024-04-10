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
import Equipmentwithdescriptionanddesign from '../pages/buildingEnvelope'
import BuildingPerformance from '../pages/buildingPerformance'
import SmartReadiness from '../pages/smartReadiness'
import BuildingDocumentationBIM from '../pages/buildingDocumentationBIM'
import ConsumptiondataofenergyForecasting from '../pages/Consumptiondataofenergy(forecasting)'
import ConsumptiondataofenergyHistorical from '../pages/Consumptiondataofenergy(historical)'
import ConsumptiondataofenergyInvoices from '../pages/Consumptiondataofenergy(invoices)'
import Informationonoccupancy from '../pages/Informationonoccupancy'
import ComfortEwellbeing from '../pages/Comfort&well-being'
import BuildingDocumentationBIMIASI from '../pages/buildingDocumentationBIMIASI'
import CostInformationinvoices from '../pages/costInformation(invoices)'
import Savingsintheoperatingcostsrenovation from '../pages/savingsintheoperatingcosts(renovation)'

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

    const [userRole, setUserRole] = useState("");
    const [userDblStructure, setUserDblStructure] = useState("");

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserRole(AuthService.getRole());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    useEffect(() => {
        // Nel componente dove hai bisogno della struttura
        setUserDblStructure(AuthService.getDblStructure());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
             <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Finance" {...a11yProps(5)} />
                                    <Tab label="Building Documentation BIM" {...a11yProps(6)} />
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
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)"  style={{ backgroundColor:'yellow'}}  {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)"  {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)"  style={{ backgroundColor:'yellow'}}  {...a11yProps(2)} />
                                        <Tab label="Maintenance Report"  style={{ backgroundColor:'yellow'}}  {...a11yProps(3)} />
                                        <Tab label="Information on occupancy" style={{ backgroundColor:'yellow'}} {...a11yProps(4)} />
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
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Cost Information (invoices)" {...a11yProps(0)} />
                                        <Tab label="Savings in the operating costs (renovation)"  style={{ backgroundColor:'yellow'}}  {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub3} index={0}>
                                    <CostInformationinvoices />
                                </TabPanel>

                                <TabPanel value={valuesub3} index={1}>
                                    <Savingsintheoperatingcostsrenovation />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={6}>
                                <BuildingDocumentationBIMIASI />
                            </TabPanel>
                        </Grid>
                    </Grid>
        </Box>

    );
}