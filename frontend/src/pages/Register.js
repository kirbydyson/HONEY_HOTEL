import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import "../styles/Register.css";

function Register() {
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, firstname: firstName, lastname: lastName, email, password }),
        });

        if (response.ok) {
            alert("Registration successful!");
        } else {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <h2 style={{ fontWeight: 100, textAlign: "center", fontSize: "3em" }}>CREATE PROFILE</h2>
                <p style={{ fontWeight: 100, textAlign: "center", fontSize: "1.6em", marginBottom: "60px" }}>Create an account to personalize your experience</p>

                <form className="register-form" onSubmit={handleSubmit}>
                    {/* add title dropdown */}
                    <div className="form-row">
                        <FormControl style={{ width: 100 }} variant="standard">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Title
                            </InputLabel>
                            <NativeSelect
                                onChange={(e) => setTitle(e.target.value)}
                                inputProps={{
                                    name: 'title',
                                    id: 'uncontrolled-native',
                                }}
                                sx={{
                                    '& .MuiNativeSelect-root': {
                                        fontWeight: 'bold',  // Custom styling for dropdown
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'black',  // Label color
                                    },
                                    '& .MuiNativeSelect-icon': {
                                        color: 'black',  // Icon color
                                    },
                                    '&:before': {
                                        borderBottomColor: 'black',  // Default underline color
                                    },
                                    '&:after': {
                                        borderBottomColor: 'black',  // Focused underline color
                                    },
                                }}
                            >
                                <option value={"Mr"}>Mr</option>
                                <option value={"Mrs"}>Mrs</option>
                                <option value={"Miss"}>Miss</option>
                                <option value={"Ms"}>Ms</option>
                                <option value={"Dr"}>Dr</option>
                            </NativeSelect>
                        </FormControl>


                        <TextField
                            id="standard-basic"
                            label="First Name"
                            variant="standard"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            type="first name"
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'black',  // Change label color when focused
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'black',  // Change underline color when focused
                                },
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red',  // Change color of required asterisk
                                },
                                marginLeft: "20px"
                            }}
                        />
                    </div>
                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        type="last name"
                        sx={{
                            '& label.Mui-focused': {
                                color: 'black',  // Change label color when focused
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'black',  // Change underline color when focused
                            },
                            '& .MuiInputLabel-asterisk': {
                                color: 'red',  // Change color of required asterisk
                            },

                            marginBottom: "20px"
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Email"
                        variant="standard"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        sx={{
                            '& label.Mui-focused': {
                                color: 'black',  // Change label color when focused
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'black',  // Change underline color when focused
                            },
                            '& .MuiInputLabel-asterisk': {
                                color: 'red',  // Change color of required asterisk
                            }
                        }}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        style={{ marginTop: "30px", marginBottom: "30px" }}
                        sx={{
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'black',
                            },
                            '& .MuiInputLabel-asterisk': {
                                color: 'red',// Change color of required asterisk
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <button type="submit" className="register-button"><strong>CREATE PROFILE</strong></button>

                </form>
            </div>

            <div className="register-right" style={{ backgroundImage: "url('/uploads/LOGIN_LANDING_PHOTO.jpeg')" }}>
            </div>
        </div>
    );
}

export default Register;
