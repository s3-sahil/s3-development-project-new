import {
    Box,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    FormControlLabel,
    TextField,
    MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransporterModal from "./TransporterModal";
import { addPackingSlip, fetchItemcodeAPI } from "app/utils/authServices";

const PackingSlipForm = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        packingType: "",
        subType: "",
        slipNo: "",
        date: "",
        customer: "",
        orderNo: "",
        remark: "",
        poNo: "",
        poDate: "",
        referGrn: false,
        itemCode: "",
        operation: "",
        quantity: "",
        formNo: "",
        formDate: "",
        formType: "",
        currency: "",
    });

    const [items, setItems] = useState([]);
    const [openTransporter, setOpenTransporter] = useState(false);
    const [transporterData, setTransporterData] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemCodes, setItemCodes] = useState([]);

    useEffect(() => {
        loadItemCodes();
    }, []);

    const loadItemCodes = async () => {
        const data = await fetchItemcodeAPI();
        setItemCodes(data);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState({
            ...state,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddItem = () => {
        if (!state.itemCode || !state.quantity) return;

        const newItem = {
            itemCode: state.itemCode,
            operation: state.operation,
            quantity: state.quantity,
            formNo: state.formNo,
            formDate: state.formDate,
            formType: state.formType,
            currency: state.currency,
        };

        setItems([...items, newItem]);

        // Clear only item-related fields
        setState({
            ...state,
            itemCode: "",
            operation: "",
            quantity: "",
            formNo: "",
            formDate: "",
            formType: "",
            currency: "",
        });
    };

    const handleRemoveItem = () => {
        const updatedItems = items.filter(
            (_, index) => !selectedItems.includes(index)
        );

        setItems(updatedItems);
        setSelectedItems([]);
    };

    const handleItemSelect = (index) => {
        const isSelected = selectedItems.includes(index);

        if (isSelected) {
            // uncheck
            setSelectedItems([]);
            setState((prev) => ({
                ...prev,
                itemCode: "",
            }));
        } else {
            // check
            setSelectedItems([index]);
            setState((prev) => ({
                ...prev,
                itemCode: items[index].itemCode,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            packingSlip_ex: {
                slip_No: state.slipNo,
                slip_dt: state.date,
                cust_Code: state.customer,
                po_Id: state.poNo,
                po_id_dt: state.poDate,
                emp_no: state.empNo,
                remark: state.remark,
                slip_type: state.packingType,
                profcen_cd: localStorage.getItem("PROFCEN_CD"),
                saleS_TYPE: state.subType,
                iS_REFERGIN: state.referGrn ? "Y" : "N",
                curR_CODE: state.currency || "INR",
                form_type: state.formType || "Invoice",
                form_no: state.formNo || "INV-001",
                form_date: state.formDate || new Date().toISOString(),

                transporteR_CODE: transporterData?.transporterCode || "",
                vehiclE_NO: transporterData?.vehicleNo || "",
                deleverY_BY: transporterData?.transportMode || "",
                transport: transporterData?.transporterOn || "",
                packFWD_amt: Number(transporterData?.packFwdAmt || 0),
                ewayBill_no: transporterData?.ewayBillNo || "",

                custMatAmt: 0,
                trans_name: transporterData?.transporterName || "",
                uT1_no: state.ut1No || "",
                uT1_date: state.ut1Date || new Date().toISOString(),
                valid_date: state.validDate || new Date().toISOString(),
                discAmount: state.discount || 0,

                app_by2: state.appBy2 || "",
                app_date2: state.appDate2 || new Date().toISOString(),
                user_name: "ADMIN",
                user_date: new Date().toISOString(),
                app_flag: state.appFlag || "Y",
                app_by: state.appBy || "",
                app_date: state.appDate || new Date().toISOString(),
                app_by1: state.appBy1 || "",
                app_date1: state.appDate1 || new Date().toISOString(),
            },

            list_packingslip_detail_ex: items.map((item) => ({
                slip_No: state.slipNo,
                slip_dt: state.date,
                item_code: item.itemCode,
                quantity: Number(item.quantity),
                emp_no: state.empNo || "",
                heat_code: item.heatCode || "",
                inv_no: item.invNo || "",
                inv_dt: item.invDate || new Date().toISOString(),
                slip_type: state.packingType,
                profcen_cd: localStorage.getItem("PROFCEN_CD"),
                amend_no: item.amendNo || "",
                amend_dt: item.amendDate || new Date().toISOString(),
                po_Id: state.poNo,
                po_id_dt: state.poDate,
                uL_LOCATION: item.ulLocation || "",
                remark: state.remark,
                wt: Number(item.weight || 0),
                box_no: item.boxNo || "",
                man_Dt: item.manDate || new Date().toISOString(),
                exp_Dt: item.expDate || new Date().toISOString(),
                batchQty: Number(item.batchQty || 0),
                batch_no: item.batchNo || "",
                burnt_per: Number(item.burntPer || 0),
                wo_no: item.woNo || "",
                wo_date: item.woDate || new Date().toISOString(),
                cust_Ul_Location: item.custUlLocation || "",
                act_batchqty: Number(item.actBatchQty || 0),
                box_uom: item.boxUom || "",
                layout_len: Number(item.layoutLen || 0),
                stk_idnt: item.stockIdent || "",
                cust_item_desc: item.custItemDesc || "",
                pcust_code: item.pcustCode || "",
                packingrate: Number(item.packingRate || 0),
                sW_flag: item.swFlag || "",
                part_full: item.partFull || "",
                mfG_rate: Number(item.mfgRate || 0),
                pack_uom: item.packUom || "",
            })),

            list_tag_details_ex: tags.map((tag) => ({
                slip_no: state.slipNo,
                slip_date: state.date,
                inv_no: tag.invNo || "",
                inv_date: tag.invDate || new Date().toISOString(),
                profcen_cd: localStorage.getItem("PROFCEN_CD"),
                srno: Number(tag.srNo || 0),
                packingtype: tag.packingType || "",
                qty_per_pack: Number(tag.qtyPerPack || 0),
                packqty: Number(tag.packQty || 0),
                inV_TYPE: tag.invType || "",
                saleS_TYPE: state.subType,
                item_code: tag.itemCode || "",
                wt_per_box: Number(tag.wtPerBox || 0),
                sub_type: tag.subType || "",
                subpackqty: Number(tag.subPackQty || 0),
                pack_remark: tag.packRemark || "",
                ul_Location: tag.ulLocation || "",
                cinv_no: tag.cinvNo || "",
                cinv_Dt: tag.cinvDate || new Date().toISOString(),
                po_id: state.poNo,
                tBox_no: tag.tBoxNo || "",
            })),
        };

        console.log("FINAL PAYLOAD:", payload);

        try {
            const res = await addPackingSlip(payload);
            alert(res.Message);
            navigate("/material/packing-slip");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: "Transactions" },
                        { name: "Packing Slip" },
                    ]}
                />
            </Box>

            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        background: "#fff",
                        padding: 4,
                    }}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, 1fr)"
                        gap={3}
                    >
                        <TextField
                            label="Packing Type"
                            name="packingType"
                            value={state.packingType}
                            onChange={handleChange}
                            select
                            size="small"
                            fullWidth
                        >
                            <MenuItem value="Domestic">Domestic</MenuItem>
                            <MenuItem value="Export">Export</MenuItem>
                        </TextField>

                        <TextField
                            label="Sub Type"
                            name="subType"
                            value={state.subType}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Slip No"
                            name="slipNo"
                            value={state.slipNo}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            type="date"
                            label="Date"
                            name="date"
                            value={state.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Customer"
                            name="customer"
                            value={state.customer}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Order No"
                            name="orderNo"
                            value={state.orderNo}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="P.O No"
                            name="poNo"
                            value={state.poNo}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            type="date"
                            label="P.O Date"
                            name="poDate"
                            value={state.poDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Remark"
                            name="remark"
                            value={state.remark}
                            onChange={handleChange}
                            size="small"
                            rows={2}
                            fullWidth
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.referGrn}
                                    onChange={handleChange}
                                    name="referGrn"
                                />
                            }
                            label="Refer GRN"
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        background: "#fff",
                        padding: 4, mb: -4, mt: -4,
                        justifyContent: "flex-end",
                        display: "flex"
                    }}
                >
                    <Box display="flex" gap={2}>
                        <Button variant="contained" onClick={handleAddItem}>
                            ADD
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            disabled={selectedItems.length === 0}
                            onClick={handleRemoveItem}
                        >
                            REMOVE
                        </Button>


                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenTransporter(true)}
                        >
                            TRANSPORTER
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        background: "#fff",
                        padding: 4,
                    }}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, 1fr)"
                        gap={3}
                        alignItems="center"
                    >
                        <TextField
                            size="small"
                            select
                            fullWidth
                            label="Item Code"
                            name="itemCode"
                            value={state.itemCode || ""}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>

                            {itemCodes.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    value={item.ITEM_CODE}
                                >
                                    {item.ITEM_CODE} - {item.CATG_CODE}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Operation"
                            name="operation"
                            value={state.operation}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={state.quantity}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                    </Box>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, 1fr)"
                        gap={3}
                        mt={4}
                    >
                        <TextField
                            label="Form No"
                            name="formNo"
                            value={state.formNo}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            type="date"
                            label="Form Date"
                            name="formDate"
                            value={state.formDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Form Type"
                            name="formType"
                            value={state.formType}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            label="Currency"
                            name="currency"
                            value={state.currency}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                    </Box>

                    {/* Items Table */}
                    {items.length > 0 && (
                        <Box mt={4}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" />
                                        <TableCell>Item Code</TableCell>
                                        <TableCell>Operation</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Form No</TableCell>
                                        <TableCell>Form Date</TableCell>
                                        <TableCell>Form Type</TableCell>
                                        <TableCell>Currency</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            selected={selectedItems.includes(index)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectedItems.includes(index)}
                                                    onChange={() => handleItemSelect(index)}
                                                />
                                            </TableCell>
                                            <TableCell>{item.itemCode}</TableCell>
                                            <TableCell>{item.operation}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.formNo}</TableCell>
                                            <TableCell>{item.formDate}</TableCell>
                                            <TableCell>{item.formType}</TableCell>
                                            <TableCell>{item.currency}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}

                    {/* Save */}
                    <Box mt={4} textAlign="right">
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Icon>save</Icon>}
                        >
                            <Span>Save</Span>
                        </Button>
                    </Box>
                </Box>
            </form>

            {/* Transporter Modal */}
            <TransporterModal
                open={openTransporter}
                onClose={() => setOpenTransporter(false)}
                onSave={(data) => setTransporterData(data)}
            />
        </Container>
    );
};

export default PackingSlipForm;
