import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const InvoiceTaxDetailsModal = ({ open, onClose, onSave, initialRows = [] }) => {
    const [rows, setRows] = useState([
        { taxCode: "", description: "", amount: "" },
    ]);

    useEffect(() => {
        if (open) {
            if (initialRows.length > 0) {
                setRows(initialRows);
            } else {
                setRows([{ taxCode: "", description: "", amount: "" }]);
            }
        }
    }, [open]);

    const handleChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: 900,
                    maxWidth: 900,
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle sx={{ textAlign: "center", fontWeight: 700, color: "#6C2BD9" }}>
                Tax Details
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", left: 10, top: 10 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>

                {/* Header Row */}
                <Grid container spacing={2} mb={1}>
                    <Grid item xs={4}>
                        <Typography fontWeight={600}>Tax Code</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontWeight={600}>Description</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontWeight={600}>Amount</Typography>
                    </Grid>
                </Grid>

                {/* Data Rows */}
                {rows.map((row, index) => (
                    <Grid container spacing={2} mb={2} key={index}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                value={row.taxCode}
                                onChange={(e) =>
                                    handleChange(index, "taxCode", e.target.value)
                                }
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                value={row.description}
                                onChange={(e) =>
                                    handleChange(index, "description", e.target.value)
                                }
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                value={row.amount}
                                onChange={(e) =>
                                    handleChange(index, "amount", e.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                ))}

                {/* Footer Buttons */}
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    mt={3}
                >
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#6C2BD9" }}
                        onClick={onClose}
                    >
                        Close
                    </Button>

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#6C2BD9" }}
                        onClick={() => onSave(rows)}
                    >
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default InvoiceTaxDetailsModal;
