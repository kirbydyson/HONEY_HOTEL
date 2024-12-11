import React, { useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Grid,
    Container,
    Typography,
    Box,
} from '@mui/material';

const RoomManagement = () => {
    const [room, setRoom] = useState({
        bedType: '',
        smokingAllowed: false,
        price: '',
        priceCategory: '',
        roomTypeId: '',
    });

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: type === 'checkbox'
                ? checked
                : name === 'price' || name === 'roomTypeId'
                    ? parseFloat(value)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const roomData = {
            bedType: room.bedType,
            price: room.price,
            priceCategory: room.priceCategory,
            roomTypeId: room.roomTypeId,
            smokingAllowed: room.smokingAllowed,
            roomCategory: room.category,
        };

        try {
            const response = await fetch("http://localhost:8080/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData),
            });

            if (!response.ok) {
                throw new Error('Room creation failed');
            }

            const data = await response.json();
            console.log("Room created:", data);
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    const resetForm = () => {
        setRoom({
            bedType: '',
            smokingAllowed: false,
            price: '',
            priceCategory: '',
            roomTypeId: '',
        });
    };

    return (
        <Box sx={{marginTop: 30, marginBottom: 20}}>
            <h2 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '5px',
                textAlign: 'center',
                color: 'black',
            }}>
                Add Room
            </h2>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Add Room
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={14}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Bed Type</InputLabel>
                                <Select
                                    name="bedType"
                                    value={room.bedType}
                                    onChange={handleChange}
                                    label="Bed Type"
                                >
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Double">Double</MenuItem>
                                    <MenuItem value="Family">Family</MenuItem>
                                    <MenuItem value="Suite">Suite</MenuItem>
                                    <MenuItem value="Deluxe">Deluxe</MenuItem>
                                    <MenuItem value="Standard">Standard</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="smokingAllowed"
                                        checked={room.smokingAllowed}
                                        onChange={handleChange}
                                    />
                                }
                                label="Smoking Allowed"
                                sx={{ display: 'flex',
                                    alignItems: 'center',
                                    color: 'black',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                name="price"
                                value={room.price}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                                required
                                InputProps={{
                                    style: {
                                        textAlign: 'center',
                                        height: '60px',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <FormControl fullWidth required sx={{ marginTop: '15px' }}>
                                    <InputLabel>Price Category</InputLabel>
                                    <Select
                                        label="Price Category"
                                        name="priceCategory"
                                        value={room.priceCategory}
                                        onChange={handleChange}
                                        fullWidth
                                        sx={{
                                            height: '60px',
                                        }}
                                    >
                                        <MenuItem value="Economy">Economy</MenuItem>
                                        <MenuItem value="Comfort">Comfort</MenuItem>
                                        <MenuItem value="Premium">Premium</MenuItem>
                                        <MenuItem value="Luxury">Luxury</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={14}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="roomType-label">Room Type</InputLabel>
                                <Select
                                    labelId="roomType-label"
                                    id="roomType"
                                    value={room.roomTypeId}
                                    label="Room Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Single</MenuItem>
                                    <MenuItem value={2}>Double</MenuItem>
                                    <MenuItem value={3}>Family</MenuItem>
                                    <MenuItem value={4}>Suite</MenuItem>
                                    <MenuItem value={5}>Deluxe</MenuItem>
                                    <MenuItem value={6}>Standard</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Room Category</InputLabel>
                                <Select
                                    name="roomTypeId"
                                    value={room.roomTypeId}
                                    onChange={handleChange}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={14} container spacing={4}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={resetForm}
                                    fullWidth
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};

export default RoomManagement;
