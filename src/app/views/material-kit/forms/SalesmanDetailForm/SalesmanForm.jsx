import { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Span } from "app/components/Typography";
import { Box, Container } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

const SalesmanForm = () => {
    const [state, setState] = useState({
        employeeCode: "",
        employeeName: "",
        email: "",
        contactNo: "",
        gender: "",
        agreedToTerms: false
    });

    const employeeOptions = [
        { code: "EMP001", label: "EMP001 - John Doe" },
        { code: "EMP002", label: "EMP002 - Jane Smith" },
        { code: "EMP003", label: "EMP003 - Rahul Kumar" }
    ];

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setState({ ...state, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", state);
    };

    const { employeeCode, employeeName, email, contactNo, gender, agreedToTerms } = state;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                    <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <TextField
                                select
                                fullWidth
                                name="employeeCode"
                                label="Employee Code"
                                value={employeeCode}
                                onChange={handleChange}
                            >
                                {employeeOptions.map((option) => (
                                    <MenuItem key={option.code} value={option.code}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                name="employeeName"
                                label="Employee Name"
                                value={employeeName}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                name="email"
                                label="Email ID"
                                type="email"
                                value={email}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                name="contactNo"
                                label="Contact No"
                                type="tel"
                                value={contactNo}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid size={{ md: 6, xs: 12 }} sx={{ mt: 2 }}>
                        <Stack spacing={3}>
                            <RadioGroup row name="gender" value={gender} onChange={handleChange}>
                                <FormControlLabel
                                    value="Male"
                                    label="Male"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />
                                <FormControlLabel
                                    value="Female"
                                    label="Female"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />
                                <FormControlLabel
                                    value="Others"
                                    label="Others"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />
                            </RadioGroup>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="agreedToTerms"
                                        checked={agreedToTerms}
                                        onChange={handleChange}
                                    />
                                }
                                label="I have read and agree to the terms of service."
                            />
                        </Stack>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
                    <Button color="primary" variant="contained" type="submit">
                        <Icon>save</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default SalesmanForm;