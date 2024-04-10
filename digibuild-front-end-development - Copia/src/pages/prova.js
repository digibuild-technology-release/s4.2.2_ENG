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

function createData(name, protein) {
    return { name, protein };
}

const initialRows = [
    createData('Frozen yoghurt', '4.0'),
    createData('Ice cream sandwich', '4.3'),
];

export default function EditableTable() {
    const [rows, setRows] = useState(initialRows);
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [newRowName, setNewRowName] = useState('');
    const [newRowValue, setNewRowValue] = useState('');

    const handleEditRow = (index) => {
        setEditedValue(rows[index].protein);
        setEditableRowIndex(index);
    };

    const handleSave = () => {
        const updatedRows = [...rows];
        updatedRows[editableRowIndex].protein = editedValue;
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
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.name}>
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
                                        row.protein
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
                    id="outlined-basic-protein"
                    label="Value"
                    variant="outlined"
                    value={newRowValue}
                    onChange={(event) => setNewRowValue(event.target.value)}
                />
                <Button variant="contained" onClick={handleAddRow}>Add Row</Button>
            </Box>
        </>
    );
}
