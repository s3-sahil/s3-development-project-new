import {
    Box,
    Container,
    TextField,
    MenuItem,
    Button,
    Icon,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";

const EnquiryLoginEntryForm = () => {
    return (
        <Container maxWidth="xl">
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Enquiry Login Entry" },
                    ]}
                />
            </Box>

            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                    <TextField label="Marketing By" size="small" />
                    <TextField label="Type" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Source" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Enquiry No" size="small" />
                    <TextField
                        label="Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box mt={2}>
                    <FormLabel>Customer Type</FormLabel>
                    <RadioGroup row>
                        <FormControlLabel value="existing" control={<Radio />} label="Existing Customer" />
                        <FormControlLabel value="new" control={<Radio />} label="New Customer" />
                    </RadioGroup>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                    <TextField label="Customer Code" size="small" />
                    <TextField label="Customer Name" size="small" />
                    <TextField label="Customer Category" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Industry Type" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>

                    <TextField label="Address" size="small" />
                    <TextField label="Address 1" size="small" />
                    <TextField label="City" size="small" />
                    <TextField label="Pincode" size="small" />

                    <TextField label="Country" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="State" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="ISD / STD" size="small" />
                    <TextField label="Telephone" size="small" />

                    <TextField label="Fax" size="small" />
                    <TextField label="Email" size="small" />
                    <TextField label="Contact Person" size="small" />
                    <TextField label="Designation" size="small" />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
                    <TextField label="Item Code" size="small" />
                    <TextField label="Item Name" size="small" />
                    <TextField label="Item Category" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Child Category" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Quantity" size="small" />
                    <TextField label="UOM" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>

                    <TextField label="Pilot Qty" size="small" />
                    <TextField label="Annual Qty" size="small" />
                    <TextField label="Customer Part No" size="small" />
                    <TextField label="Customer Machining" size="small" />
                    <TextField label="Drawing No" size="small" />
                    <TextField label="Drawing Rev No" size="small" />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                    <TextField label="Application" size="small" />
                    <TextField
                        label="Drawing Date"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField label="Technical Feasibility" size="small" select>
                        <MenuItem value="">Select</MenuItem>
                    </TextField>
                    <TextField label="Remark" size="small" multiline rows={1} />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="contained" color="secondary">
                        Add Item
                    </Button>
                    <Button variant="contained" color="secondary">
                        Remove Item
                    </Button>
                    <Button variant="contained" color="secondary">
                        Other Detail
                    </Button>
                </Box>

                <Box mt={4} textAlign="right">
                    <Button variant="contained" startIcon={<Icon>save</Icon>}>
                        <Span>Save</Span>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EnquiryLoginEntryForm;