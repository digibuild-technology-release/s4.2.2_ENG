import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function createData(name, value) {
    return { name, value };
}

const initialRows = [
    createData('Space heating system', 'Text'),
    createData('Domestic hot water (DHN)', 'Text'),
    createData('Space cooling system', 'https://cloud2.digibuild-project.com/file/40dbd261-1465-453f-a0c4-4ae9fe735932/download'),
    createData('Lighting system', 'Text'),
    createData('Blinds', 'Text'),
    createData('Technical home and building management', 'Text'),
    createData('Building Automation and Control system (BACS)', 'Text'),
    createData('ON- SITE energy renovation and storage', 'Text'),
    createData('Battery energy storage system', 'Text')
];

export default function EditableTable() {
    const [rows, setRows] = useState(initialRows);
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [newRowName, setNewRowName] = useState('');
    const [newRowValue, setNewRowValue] = useState('');

    const handleEditRow = (index) => {
        setEditedValue(rows[index].value);
        setEditableRowIndex(index);
    };

    const handleSave = () => {
        const updatedRows = [...rows];
        updatedRows[editableRowIndex].value = editedValue;
        setRows(updatedRows);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const handleAddRow = () => {
        if (newRowName !== '' && newRowValue !== '') {
            const newRow = createData(newRowName, newRowValue);
            setRows([...rows, newRow]);
            setNewRowName('');
            setNewRowValue('');
        }
    };

    useEffect(() => {
        console.log('Rows:', rows);
    }, [rows]);

    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            {/* <Box sx={{ flexGrow: 1, minHeight: "90vh" }}> */}
            <Container maxWidth="xl" sx={{marginTop: "3vh", marginBottom: "3vh", padding: "3%" }}>
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {editableRowIndex === index ? (
                                                <TextField
                                                    value={editedValue}
                                                    onChange={handleValueChange}
                                                />
                                            ) : (
                                                row.value.startsWith('http') ? (
                                                    <a href={row.value} target="_blank" rel="noopener noreferrer">{row.value}</a>
                                                ) : (
                                                    row.value
                                                )
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {editableRowIndex === index ? (
                                                <Button onClick={handleSave}>Save</Button>
                                            ) : (
                                                <Button onClick={() => handleEditRow(index)}>Edit</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1, width: '25ch', marginTop: '2vh' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic-name"
                            label="Name"
                            variant="outlined"
                            value={newRowName}
                            onChange={(event) => setNewRowName(event.target.value)}
                        />
                        <TextField
                            id="outlined-basic-value"
                            label="Value"
                            variant="outlined"
                            value={newRowValue}
                            onChange={(event) => setNewRowValue(event.target.value)}
                        />
                        <Button variant="contained" onClick={handleAddRow}>Add Row</Button>
                    </Box>
                </>
            </Container>
        </Box >
    );
}
 