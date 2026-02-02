import { CheckBox } from "@mui/icons-material";
import { Box, Container, TextField, MenuItem, Button, Icon, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { addEnquiryDetails } from "app/utils/authServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EnquiryForm = () => {
    const location = useLocation();
    const enquiryDetails = location.state?.enquiryDetails;
    const isEditMode = !!enquiryDetails;

    const [customerType, setCustomerType] = useState("existing");
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [formData, setFormData] = useState({
        marketingBy: "",
        type: "",
        source: "",
        enquiryNo: "",
        date: "",
        customerCategory: "",
        customerCode: "",
        customerName: "",
        address: "",
        address1: "",
        cityName: "",
        pincode: "",
        country: "",
        state: "",
        telephone: "",
        email: "",
        industryType: "",
        designation: "",
        refDocDate: "",
        contactPerson: "",
        remark: "",
        customerPartNo: "",
        itemCode: "",
        itemName: "",
        quantity: "",
        uom: "",
        application: "",
        technicalFeasibility: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRemoveItem = () => {
        setRows(rows.filter(row => !selectedRows.includes(row.id)));
        setSelectedRows([]);
    };

    const handleAddItem = () => {
        if (!formData.itemCode || !formData.quantity) {
            alert("Item Code and Quantity required");
            return;
        }

        setRows(prev => [
            ...prev,
            {
                id: Date.now(),
                customerPartNo: formData.customerPartNo,
                itemCode: formData.itemCode,
                itemName: formData.itemName,
                quantity: formData.quantity,
                uom: formData.uom,
                selected: false
            }
        ]);

        setFormData(prev => ({
            ...prev,
            customerPartNo: "",
            itemCode: "",
            itemName: "",
            quantity: "",
            uom: ""
        }));
    };

    const handleSelect = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        const profcen_cd = localStorage.getItem("selectedDivision") || "";
        const payload = {
            enquiry_hed_ex: {
                enq_no: formData.enquiryNo,
                enq_dt: formData.date || new Date().toISOString(),
                cust_code: formData.customerCode,
                cust_name: formData.customerName,
                cust_add1: formData.address,
                cust_add2: formData.address1,
                cust_city: formData.cityName,
                cust_state: formData.state,
                cust_country: formData.country,
                cust_pin: formData.pincode,
                fax: "string",
                phone: formData.telephone,
                email: formData.email,
                ref_no: "string",
                ref_dt: formData.refDocDate || new Date().toISOString(),
                emp_name: formData.marketingBy,
                enq_type: formData.type,
                cont_per: formData.contactPerson,
                cont_des: formData.designation,
                enq_close: "s",
                product_position: "string",
                business_type: "string",
                cust_spec: "string",
                pack_dtl: "string",
                agency_certi: "s",
                tooling_costby: "string",
                remarks: formData.remark,
                std: "string",
                prod_spec: "string",
                profcen_cd: profcen_cd,
                user_name: "string",
                userdate: new Date().toISOString(),
                trng_flg: "st",
                source_name: formData.source,
                industry_name: formData.industryType
            },
            list_Enquiry_det_ex: rows.map((row, index) => ({
                enq_no: formData.enquiryNo,
                enq_dt: formData.date || new Date().toISOString(),
                item_name: row.itemName,
                item_Code: row.itemCode,
                cust_item_code: row.customerPartNo,
                drg_no: "string",
                drg_Rev_no: "strin",
                final_process: "string",
                quantity: Number(row.quantity) || 0,
                physibility: row.technicalFeasibility || "s",
                costing_dt: new Date().toISOString(),
                costing_no: "string",
                quot_dt: new Date().toISOString(),
                quot_no: "string",
                po_dt: new Date().toISOString(),
                po_no: "string",
                sample_dt: new Date().toISOString(),
                first_disp: new Date().toISOString(),
                ap_status: "s",
                status: "s",
                cust_draw: "string",
                revision_no: "strin",
                revision_date: new Date().toISOString(),
                sample_size: "string",
                consignment_size: "string",
                annu_req: 0,
                surface_treat: "string",
                mat_spec: "string",
                sr_no: index + 1,
                drg_rev_dt: new Date().toISOString(),
                profcen_cd: profcen_cd,
                physibility_res: "string",
                mcAllowSurface: "string",
                forg_method: "string",
                gross_wt: 0,
                input_wt: 0,
                net_wt: 0,
                wt_uom: "str",
                complex_factor: "string",
                forg_unit: "string",
                alt_forg_unit: "string",
                parting_line: "string",
                dia_bl_size: "string",
                op_seq: "string",
                prod_rate: "string",
                post_opns: "string",
                coining_det: "string",
                prod_rate_coining: "string",
                machine_Det: "string",
                stamp_logo_Det: "string",
                drawing_app: "str",
                forg_samp_req: "str",
                additoinal_rem: "string",
                apprx_lead_time: "string",
                disc_resolved: "string",
                parT_B_DT: new Date().toISOString(),
                parT_C_DT: new Date().toISOString(),
                disc_Partc: "string",
                disc_resolved_C: "string",
                avl_raw_mat: "string",
                part_no: "string",
                od: 0,
                id: 0,
                length: 0,
                density: 0,
                tollerence: 0,
                item_Catg: "string",
                iTemcatg_uom: "strin",
                prodpo_no: "string",
                prodpo_dt: new Date().toISOString(),
                enq_uom: row.uom,
                fG_Catg: "st",
                application: row.application
            }))
        };

        try {
            if (isEditMode) {
                await updateEnquiryDetails(payload);
                alert("Enquiry updated successfully!");
            } else {
                await addEnquiryDetails(payload);
                alert("Enquiry saved successfully!");
            }
            setFormData({
                marketingBy: "",
                type: "",
                source: "",
                enquiryNo: "",
                date: "",
                customerCategory: "",
                customerCode: "",
                customerName: "",
                address: "",
                address1: "",
                cityName: "",
                pincode: "",
                country: "",
                state: "",
                telephone: "",
                email: "",
                industryType: "",
                designation: "",
                refDocDate: "",
                contactPerson: "",
                remark: "",
                customerPartNo: "",
                itemCode: "",
                itemName: "",
                quantity: "",
                uom: "",
                application: "",
                technicalFeasibility: ""
            });
            setRows([]);
            setSelectedRows([]);
        } catch (error) {
            alert(error.message || "Failed to save enquiry");
        }
    };

    useEffect(() => {
        if (!enquiryDetails) return;

        const hed = enquiryDetails.Header_Data;
        const det = enquiryDetails.Detail_Data || [];

        if (!hed) return;

        setFormData((prev) => ({
            ...prev,
            enquiryNo: hed.Enq_no ?? "",
            date: hed.Enq_dt ? hed.Enq_dt.substring(0, 10) : "",
            marketingBy: hed.Emp_name ?? "",
            type: hed.Enq_type ?? "",
            source: hed.source_name ?? "",
            customerCode: hed.Cust_code ?? "",
            customerName: hed.Cust_name ?? "",
            address: hed.Cust_add1 ?? "",
            address1: hed.Cust_add2 ?? "",
            cityName: hed.Cust_city ?? "",
            state: hed.Cust_state ?? "",
            country: hed.Cust_country ?? "",
            pincode: hed.Cust_pin ?? "",
            telephone: hed.Phone ?? "",
            email: hed.Email ?? "",
            industryType: hed.Industry_name ?? "",
            designation: hed.cont_des ?? "",
            refDocDate: hed.Ref_dt ? hed.Ref_dt.substring(0, 10) : "",
            contactPerson: hed.cont_per ?? "",
            remark: hed.remarks ?? "",
        }));
        debugger
        setRows(
            det.map((item, index) => ({
                id: index + 1,
                customerPartNo: item.Cust_item_code ?? "",
                itemCode: item.Item_Code ?? "",
                itemName: item.Item_name ?? "",
                quantity: item.Quantity ?? 0,
                uom: item.enq_uom ?? "",
                application: item.Application ?? "",
                technicalFeasibility: item.Physibility ?? "",
            }))
        );
    }, [enquiryDetails]);

    return (
        <Container maxWidth="xl">
            <Box className="breadcrumb" mb={2}>
                <Breadcrumb
                    routeSegments={[
                        { name: "Sales" },
                        { name: "Enquiry Detail" },
                    ]}
                />
            </Box>

            <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>

                <Box display="flex" justifyContent="space-between" mb={3}>
                    <Box display="flex" alignItems="center" gap={1}>

                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<Icon>{isEditMode ? "update" : "save"}</Icon>}
                        onClick={handleSave}
                    >
                        {isEditMode ? "Update" : "Save"}
                    </Button>

                </Box>

                <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>

                    <TextField
                        label="Marketing By"
                        name="marketingBy"
                        value={formData.marketingBy}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField select label="Type" name="type" value={formData.type} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                        <MenuItem value="service">Service</MenuItem>
                        <MenuItem value="support">Support</MenuItem>
                    </TextField>

                    <TextField select label="Source" name="source" value={formData.source} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                        <MenuItem value="website">Website</MenuItem>
                    </TextField>

                    <FormControlLabel
                        control={<Checkbox />}
                        label="Missing"
                    />

                    <FormControl>
                        <FormLabel>Customer</FormLabel>
                        <RadioGroup row value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                            <FormControlLabel value="existing" control={<Radio size="small" />} label="Existing" />
                            <FormControlLabel value="new" control={<Radio size="small" />} label="New" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        label="Enquiry No"
                        name="enquiryNo"
                        value={formData.enquiryNo}
                        size="small"
                        InputProps={{ readOnly: true }}
                    />


                    <TextField
                        type="date"
                        label="Date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField select label="Customer Category" name="customerCategory" value={formData.customerCategory} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="gold">Gold</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                        <MenuItem value="bronze">Bronze</MenuItem>
                    </TextField>

                    <TextField
                        label="Customer Code"
                        name="customerCode"
                        value={formData.customerCode}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Customer Name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Address 1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="City Name"
                        name="cityName"
                        value={formData.cityName}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField select label="Country" name="country" value={formData.country} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="india">India</MenuItem>
                        <MenuItem value="usa">USA</MenuItem>
                        <MenuItem value="uk">UK</MenuItem>
                    </TextField>

                    <TextField select label="State" name="state" value={formData.state} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="maharashtra">Maharashtra</MenuItem>
                        <MenuItem value="karnataka">Karnataka</MenuItem>
                        <MenuItem value="delhi">Delhi</MenuItem>
                    </TextField>

                    <TextField
                        label="Telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField select label="Industry Type" name="industryType" value={formData.industryType} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="it">IT</MenuItem>
                        <MenuItem value="manufacturing">Manufacturing</MenuItem>
                        <MenuItem value="services">Services</MenuItem>
                    </TextField>

                    <TextField
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        type="date"
                        name="refDocDate"
                        label="Ref. Document Dt"
                        size="small"
                        value={formData.refDocDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Contact Person"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="Remark"
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Customer Part No"
                        name="customerPartNo"
                        value={formData.customerPartNo}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Item Code"
                        name="itemCode"
                        value={formData.itemCode}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Item Name"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        size="small"
                    />

                    <TextField select label="UOM" name="uom" value={formData.uom} onChange={handleChange} size="small">
                        <MenuItem value="">-- Select --</MenuItem>
                        <MenuItem value="pcs">PCS</MenuItem>
                        <MenuItem value="kg">KG</MenuItem>
                        <MenuItem value="ltr">LTR</MenuItem>
                    </TextField>

                    <TextField
                        label="Application"
                        name="application"
                        value={formData.application}
                        onChange={handleChange}
                        size="small"
                    />
                    <TextField
                        label="Technical Feasibility"
                        name="technicalFeasibility"
                        value={formData.technicalFeasibility}
                        onChange={handleChange}
                        size="small"
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="contained" onClick={handleAddItem}>
                        Add Item
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemoveItem} disabled={selectedRows.length === 0}>
                        Remove
                    </Button>
                </Box>

                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Customer Part No</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>UOM</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedRows.includes(row.id)}
                                                onChange={() => handleSelect(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.customerPartNo}</TableCell>
                                        <TableCell>{row.itemCode}</TableCell>
                                        <TableCell>{row.itemName}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.uom}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No items added
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Container>
    );
};

export default EnquiryForm;