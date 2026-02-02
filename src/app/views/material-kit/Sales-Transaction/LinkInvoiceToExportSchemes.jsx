import { Box, Container, TextField, Button, Checkbox, FormControlLabel, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import RoDTEPModal from "./RoDTEPModal";
import AdvanceAuthorizationModal from "./AdvanceAuthorizationModal";
import EPCGModal from "./EPCGModal";
import DBKModal from "./DBKModal";
import { useState } from "react";

const LinkInvoiceToExportSchemes = () => {
    const [openAdvance, setOpenAdvance] = useState(false);
    const [openRoDTEP, setOpenRoDTEP] = useState(false);
    const [openEPCG, setOpenEPCG] = useState(false);
    const [openDBK, setOpenDBK] = useState(false);

    return (
        <Container maxWidth="xl">
            <Box className="breadcrumb" mb={2}>
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Link Invoice To Export Schemes" },
                    ]}
                />
            </Box>

            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>

                {/* <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Icon sx={{ cursor: "pointer" }}>arrow_back</Icon>
                        <Span fontSize={18} fontWeight={600}>
                            Link Invoice To Export Schemes
                        </Span>
                    </Box>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Icon>save</Icon>}
                    >
                        Save
                    </Button>
                </Box> */}

                <Box
                    sx={{
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, 1fr)"
                        gap={2}
                    >
                        <TextField label="Customer" size="small" />
                        <TextField label="Invoice No." size="small" />
                        <TextField
                            type="date"
                            label="Invoice Date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Show All"
                        />

                        <TextField label="Invoice Amt. in INR" size="small" />
                        <TextField label="Invoice Amt. in Currency" size="small" />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Schemes Not Applicable"
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="center"
                        gap={2}
                        mt={4}
                    >
                        <Button variant="contained" sx={{ minWidth: 100 }} onClick={() => setOpenRoDTEP(true)}>
                            RoDTEP
                        </Button>

                        <Button variant="contained" sx={{ minWidth: 180 }} onClick={() => setOpenAdvance(true)}>
                            ADVANCE AUTHORIZATION
                        </Button>

                        <Button variant="contained" sx={{ minWidth: 100 }} onClick={() => setOpenEPCG(true)}>
                            EPCG
                        </Button>

                        <Button variant="contained" sx={{ minWidth: 100 }} onClick={() => setOpenDBK(true)}>
                            DBK
                        </Button>
                    </Box>
                </Box>
            </Box>

            <RoDTEPModal
                open={openRoDTEP}
                onClose={() => setOpenRoDTEP(false)}
                onSave={(data) => {
                    console.log("RoDTEP Data:", data);
                    setOpenRoDTEP(false);
                }}
            />

            <AdvanceAuthorizationModal
                open={openAdvance}
                onClose={() => setOpenAdvance(false)}
                onSave={(data) => {
                    console.log("Advance Data:", data);
                    setOpenAdvance(false);
                }}
            />

            <EPCGModal
                open={openEPCG}
                onClose={() => setOpenEPCG(false)}
                onSave={(data) => {
                    console.log("EPCG Data:", data);
                    setOpenEPCG(false);
                }}
            />

            <DBKModal
                open={openDBK}
                onClose={() => setOpenDBK(false)}
                onSave={(data) => {
                    console.log("DBK Data:", data);
                    setOpenDBK(false);
                }}
            />

        </Container>
    );
};

export default LinkInvoiceToExportSchemes;