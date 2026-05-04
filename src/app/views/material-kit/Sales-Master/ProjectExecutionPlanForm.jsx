import { Box, Container, TextField, Button, Icon, Grid, ListSubheader, MenuItem } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetch_POIDItemCodeDropdown, Fetch_Project_activity, fetchCustomerList, ProjectExecutionPlan_SAVE, ProjectExecutionPlan_Update, ProjectExecutionPlanRetrieve } from "app/utils/authServices"


const ProjectExecutionPlanForm = () => {
  const navigate = useNavigate();
  const [customerDropdownValue, setCustomerDropdownValue] = useState([]);
  const [poidlist, setpoidlist] = useState([]);
  const [itemcodes, setitemcodes] = useState([]);
  const [activitymasterlist, setactivitymasterlist] = useState([]);
  const [actionMode, setActionMode] = useState("new"); // new | edit
  const location = useLocation(); // for edit data
  
  // const formatDate = (date) => {
  //   if (!date) return "";
  //   const d = new Date(date);
  //   const day = String(d.getDate()).padStart(2, "0");
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const year = d.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const [formData, setFormData] = useState({
    customer: "",
    orderNo: "",
    orderDate: "",
    poNo: "",
    poDate: "",
    customerName: "",
    productCode: "",
    project: "",
    productName: "",
    approvalDate: "",
    deliveryDate: "",
    totalWeeksRequired: "",
    activityCode: "",
    activityName: "",
    fromTargetDate: "",
    toTargetDate: "",
  });

  const [activities, setActivities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer") {
      const selectedCustomer = customerDropdownValue.find(
        (cust) => cust.Cust_code === value
      );

      setFormData((prev) => ({
        ...prev,
        customer: value,
        customerName: selectedCustomer ? selectedCustomer.Cust_name : "",
      }));
    }

    else if (name === "orderNo") {
      const selectedPO = poidlist.find(
        (po) => po.PO_ID === value
      );

      setFormData((prev) => ({
        ...prev,
        orderNo: value,
        orderDate: selectedPO?.PO_ID_DT
          ? selectedPO.PO_ID_DT.split("T")[0]
          : "",
        poNo: selectedPO?.PO_NO || "",   // ✅ added this
        poDate: selectedPO?.PO_DT
          ? selectedPO.PO_DT.split("T")[0]
          : "",
      }));
    }

    else if (name === "productCode") {
      const selectedItem = itemcodes.find(
        (item) => item.ITEM_CODE === value
      );

      setFormData((prev) => ({
        ...prev,
        productCode: value,
        productName: selectedItem?.ITEM_NAME || "",
      }));
    }
    else if (name === "activityCode") {
      const selectedItem = activitymasterlist.find(
        (item) => item.Activity_code === value
      );

      setFormData((prev) => ({
        ...prev,
        activityCode: value,
        activityName: selectedItem?.Description || "",
      }));
    }

    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };





  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      activityCode: formData.activityCode,
      activityName: formData.activityName,
      fromTargetDate: formData.fromTargetDate,
      toTargetDate: formData.toTargetDate,
    };

    setActivities((prev) => [...prev, newActivity]);

    setFormData((prev) => ({
      ...prev,
      activityCode: "",
      activityName: "",
      fromTargetDate: "",
      toTargetDate: "",
    }));
  };

 const DBformatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

  const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB");
};

  // Customer dropdown
  const fetchCustomer = async () => {
    try {
      const res = await fetchCustomerList();

      setCustomerDropdownValue(res || []);
    } catch (error) {
      console.error("Customer fetch error:", error);
      setCustomerDropdownValue([]);
    }
  };

  //item code list
  const fetchPOIDItemCode = async (Cust_code) => {
    try {
      // const Cust_code = formData.customer || "";
      // if (!Cust_code) return;

      const res = await fetch_POIDItemCodeDropdown(Cust_code);
      if (res) {
      // 1️⃣ Full list (for item code dropdown)
      setitemcodes(res);

      // 2️⃣ Distinct PO_ID list
      const uniquePOList = Array.from(
        new Map(res.map((item) => [item.PO_ID, item])).values()
      );

      setpoidlist(uniquePOList);
    }
    } catch (error) {
      console.error("PO Id dropdown error:", error);
    }
  };

// Activity dropdown
  const fetchActivity = async () => {
    try {
      const res = await Fetch_Project_activity();

      setactivitymasterlist(res || []);
    } catch (error) {
      console.error("Activity fetch error:", error);
      setactivitymasterlist([]);
    }
  };


// On load
useEffect(() => {
  fetchCustomer();
  fetchActivity();


  if (
          location.state?.po_id != null &&
          location.state?.Proj_code != null &&
          location.state?.profcen_cd != null &&
          location.state?.item_Code != null
          ){
      setActionMode("edit");
      fetchEditData(
        location.state.po_id,
        location.state.item_Code,
        location.state.Proj_code,
        location.state.profcen_cd);
    }

}, []);

// When customer changes
useEffect(() => {
  if (formData.customer) {
    fetchPOIDItemCode(formData.customer);
  }
}, [formData.customer]);


// 🔹 If Edit mode, fetch full record
const fetchEditData = async (po_id, item_Code, Proj_code, profcen_cd) => {
  try {
    const res = await ProjectExecutionPlanRetrieve(
      po_id,
      item_Code,
      Proj_code,
      profcen_cd
    );

    if (res?.data) {
      const data = res.data;

      // 🔹 Header mapping
      const head = data.project_execution_head_ex || {};

      setFormData({
        customer: head.cust_code || "",
        orderDate: head.po_id_Dt ? head.po_id_Dt.split("T")[0] : "",
        poNo: head.po_no || "",
        orderNo: head.po_id || "",
        poDate: head.po_Dt ? head.po_Dt.split("T")[0] : "",
        productCode: head.item_Code || "",
        project: head.Proj_code || "",
        approvalDate: head.approval_Date ? head.approval_Date.split("T")[0] : "",
        deliveryDate: head.delivery_Date ? head.delivery_Date.split("T")[0] : "",
        totalWeeksRequired: head.weeks_req || "",
        profcen_cd: "1"
      });

      // 🔹 Activities mapping
      const details = data.list_project_execution_det_ex || [];

      const mappedActivities = details.map((d) => ({
        activityCode: d.activity_Code || "",
        fromTargetDate: d.Fromtarget_Date ? d.Fromtarget_Date.split("T")[0] : "",
        toTargetDate: d.Totarget_Date ? d.Totarget_Date.split("T")[0] : "",
        proj_Code: head.Proj_code,
        profcen_cd: "1"
      }));

      setActivities(mappedActivities);
    }
  } catch (error) {
    console.error("Edit fetch error:", error);
  }
};

//////////////////////// SAVE


const handleSave = async () => {
  try {
    const payload = {
  project_execution_Head_ex: {
    cust_code: formData.customer || "",
    po_no: formData.poNo || "",
    po_Dt: DBformatDate(formData.poDate),
    po_id: formData.orderNo || "",
    po_id_Dt: DBformatDate(formData.orderDate),
    item_Code: formData.productCode || "",
    proj_code: formData.project || "",
    approval_Date: DBformatDate(formData.approvalDate),
    delivery_Date: DBformatDate(formData.deliveryDate),
    weeks_req: formData.totalWeeksRequired
      ? Number(formData.totalWeeksRequired)
      : 0,
    profcen_cd: "1",
  },

  list_Project_execution_det_ex: activities.map((a, i) => ({
    po_id: formData.orderNo || "",
    item_Code: formData.productCode || "",
    proj_Code: formData.project || "",
    activity_Code: a.activityCode,
    fromtarget_Date: DBformatDate(a.fromTargetDate),
    totarget_Date: DBformatDate(a.toTargetDate),
    sr_no: i + 1,
    profcen_cd: "1",
  })),
};

    console.log("Final Payload:", payload);

    //const res = await ProjectExecutionPlan_SAVE(payload);

    let result;
    
          result =
            actionMode === "edit"
              ? await ProjectExecutionPlan_Update(payload)
              : await ProjectExecutionPlan_SAVE(payload);
    
          alert(
            result.message ||
              (actionMode === "edit"
                ? "Project Execution Updated Successfully*"
                : "Project Execution Saved Successfully*"),
          );

    //alert("Saved successfully ✅");

    navigate("/material/sales-project-execution-plan-table");
  } catch (error) {
    console.error("Save Error:", error);
    alert(error.message);
  }
};

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Execution Plan" }]} />
      </Box>

      <Box sx={{ background: "#fff", p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <h2>Project Execution Plan</h2>
          <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={handleSave}>
            <Span>{(actionMode === "edit" ? "Update" : "Save")}</Span>
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={2.4}>
            {/* <TextField label="Customer" name="customer" value={formData.customer} onChange={handleChange} size="small" fullWidth /> */}
            <TextField
                    size="small"
                    select
                    fullWidth
                    name="customer"
                    label="Customer"
                    value={formData.customer || ""}
                    onChange={handleChange}
                    disabled={actionMode === "edit"}
                   SelectProps={{
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 350,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  },
}}
                  >
                    {/* <MenuItem value="" disabled>
                      -- Select Employee --
                    </MenuItem> */}
            
                    {/* Proper Header */}
                    <ListSubheader
                      style={{
                        position: "sticky",
                        top: 0,
                        //lineheight: "33px",
                        lineHeight: "33px", 
                        background: "#391197",
                        zIndex: 1,
                        fontWeight: "bold",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ minWidth: 120, color: "white" }}>Customer Code</div>
                        <div style={{ minWidth: 200, color: "white" }}>Customer Name</div>
                      </div>
                    </ListSubheader>
            
                    {customerDropdownValue.map((cust) => (
                      <MenuItem key={cust.Cust_code} value={cust.Cust_code}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div style={{ minWidth: 120 }}>{cust.Cust_code}</div>
                          <div style={{ minWidth: 200 }}>{cust.Cust_name}</div>
                        </div>
                      </MenuItem>
                    ))}
            </TextField>
          </Grid>
          <Grid item xs={2.4}>
            {/* <TextField label="Order No" name="orderNo" value={formData.orderNo} onChange={handleChange} size="small" fullWidth /> */}
<TextField
  size="small"
  select
  fullWidth
  name="orderNo"
  label="Order No"
  value={formData.orderNo || ""}
  onChange={handleChange}
  disabled={actionMode === "edit"}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 300,
          width: 500,
          overflowX: "auto",
        },
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    },
  }}
>
  {/* Header */}
  <ListSubheader
      sx={{
    position: "sticky",
    top: 0,
    lineHeight: "33px",
    backgroundColor: "#391197 !important",
    color: "#fff",
    zIndex: 2,
  }}
>
    <div style={{ display: "flex", width: "max-content", color: "white", backgroundColor:"#391197" }}>
      <div style={{ minWidth: 80 }}>Cust Code</div>
      <div style={{ minWidth: 120 }}>PO ID</div>
      <div style={{ minWidth: 120 }}>PO No</div>
      <div style={{ minWidth: 200 }}>Item Code</div>
      <div style={{ minWidth: 400 }}>Item Name</div>
      <div style={{ minWidth: 120 }}>PO ID DT</div>
      <div style={{ minWidth: 120 }}>PO DT</div>
      <div style={{ minWidth: 120 }}>PO Valid</div>
      <div style={{ minWidth: 100 }}>OA Type</div>
      <div style={{ minWidth: 100 }}>Dispatch Qty</div>
      <div style={{ minWidth: 100 }}>Catg Code</div>
    </div>
  </ListSubheader>

  {/* Rows */}
  {poidlist.map((cust) => (
    <MenuItem key={cust.PO_ID} value={cust.PO_ID}>
      <div style={{ display: "flex", width: "max-content" }}>
        <div style={{ minWidth: 80 }}>{cust.CUST_CODE}</div>
        <div style={{ minWidth: 120 }}>{cust.PO_ID}</div>
        <div style={{ minWidth: 120 }}>{cust.PO_NO}</div>
        <div style={{ minWidth: 200 }}>{cust.ITEM_CODE}</div>
        <div style={{ minWidth: 400 }}>{cust.ITEM_NAME}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_ID_DT)}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_DT)}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_VALID)}</div>
        <div style={{ minWidth: 100 }}>{cust.oa_type}</div>
        <div style={{ minWidth: 100 }}>{cust.DISPATCH_QTY}</div>
        <div style={{ minWidth: 100 }}>{cust.CATG_CODE}</div>
      </div>
    </MenuItem>
  ))}
</TextField>
          </Grid>
          <Grid item xs={2.4}>
            <TextField type="date" label="Order Date" name="orderDate" value={formData.orderDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField label="PO No" name="poNo" value={formData.poNo} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={2.4}>
            <TextField type="date" label="PO Date" name="poDate" value={formData.poDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
         <TextField
  label="Customer Name"
  name="customerName"
  value={formData.customerName}
  size="small"
  fullWidth
/> 
</Grid>
          <Grid item xs={6}>
            {/* <TextField label="Product Code" name="productCode" value={formData.productCode} onChange={handleChange} size="small" fullWidth /> */}
          <TextField
  size="small"
  select
  fullWidth
  name="productCode"
  label="Product Code"
  value={formData.productCode || ""}
  onChange={handleChange}
  disabled={actionMode === "edit"}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 300,
          width: 500,
          overflowX: "auto",
        },
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    },
  }}
>
  {/* Header */}
  <ListSubheader
      sx={{
    position: "sticky",
    top: 0,
    lineHeight: "33px",
    backgroundColor: "#391197 !important",
    color: "#fff",
    zIndex: 2,
  }}
>
    <div style={{ display: "flex", width: "max-content", color: "white", backgroundColor:"#391197" }}>
      <div style={{ minWidth: 80 }}>Cust Code</div>
      <div style={{ minWidth: 120 }}>PO ID</div>
      <div style={{ minWidth: 120 }}>PO No</div>
      <div style={{ minWidth: 200 }}>Item Code</div>
      <div style={{ minWidth: 400 }}>Item Name</div>
      <div style={{ minWidth: 120 }}>PO ID DT</div>
      <div style={{ minWidth: 120 }}>PO DT</div>
      <div style={{ minWidth: 120 }}>PO Valid</div>
      <div style={{ minWidth: 100 }}>OA Type</div>
      <div style={{ minWidth: 100 }}>Dispatch Qty</div>
      <div style={{ minWidth: 100 }}>Catg Code</div>
    </div>
  </ListSubheader>

  {/* Rows */}
  {itemcodes.map((cust) => (
    <MenuItem key={cust.ITEM_CODE} value={cust.ITEM_CODE}>
      <div style={{ display: "flex", width: "max-content" }}>
        <div style={{ minWidth: 80 }}>{cust.CUST_CODE}</div>
        <div style={{ minWidth: 120 }}>{cust.PO_ID}</div>
        <div style={{ minWidth: 120 }}>{cust.PO_NO}</div>
        <div style={{ minWidth: 200 }}>{cust.ITEM_CODE}</div>
        <div style={{ minWidth: 400 }}>{cust.ITEM_NAME}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_ID_DT)}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_DT)}</div>
        <div style={{ minWidth: 120 }}>{formatDate(cust.PO_VALID)}</div>
        <div style={{ minWidth: 100 }}>{cust.oa_type}</div>
        <div style={{ minWidth: 100 }}>{cust.DISPATCH_QTY}</div>
        <div style={{ minWidth: 100 }}>{cust.CATG_CODE}</div>
      </div>
    </MenuItem>
  ))}
          </TextField>
          
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField label="Project" name="project" value={formData.project} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={4}>
            <TextField type="date" label="Approval Date" name="approvalDate" value={formData.approvalDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField type="date" label="Delivery Date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Total Weeks Required" name="totalWeeksRequired" value={formData.totalWeeksRequired} onChange={handleChange} size="small" fullWidth />
          </Grid>

          {/* Activity Section */}
          <Grid item xs={12}>
            <h3>Activity Planning</h3>
          </Grid>

          <Grid item xs={3}>
            {/* <TextField label="Activity Code" name="activityCode" value={formData.activityCode} onChange={handleChange} size="small" fullWidth /> */}
          <TextField
                    size="small"
                    select
                    fullWidth
                    name="activityCode"
                    label="Activity Code"
                    value={formData.activityCode || ""}
                    onChange={handleChange}
                    disabled={actionMode === "edit"}
                   SelectProps={{
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 300,
          width: 500,
          overflowX: "auto",
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  },
}}
                  >
                    {/* <MenuItem value="" disabled>
                      -- Select Employee --
                    </MenuItem> */}
            
                    {/* Proper Header */}
                    <ListSubheader
                     sx={{
    position: "sticky",
    top: 0,
    lineHeight: "33px",
    backgroundColor: "#391197 !important",
    color: "#fff",
    zIndex: 2,
  }}
                    >
                     <div style={{ display: "flex", width: "max-content", color: "white", backgroundColor:"#391197" }}>
                        <div style={{ minWidth: 120 }}>Customer Code</div>
                        <div style={{ minWidth: 200 }}>Customer Name</div>
                      </div>
                    </ListSubheader>
            
                    {activitymasterlist.map((act) => (
                      <MenuItem key={act.Activity_code} value={act.Activity_code}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div style={{ minWidth: 120 }}>{act.Activity_code}</div>
                          <div style={{ minWidth: 200 }}>{act.Description}</div>
                        </div>
                      </MenuItem>
                    ))}
            </TextField>
          
          </Grid>
          <Grid item xs={3}>
            <TextField label="Activity Name" name="activityName" value={formData.activityName} onChange={handleChange} size="small" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="From Target Date" name="fromTargetDate" value={formData.fromTargetDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" label="To Target Date" name="toTargetDate" value={formData.toTargetDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleAddActivity}>
              Add Activity
            </Button>
          </Grid>

          {/* Activity Table */}
          <Grid item xs={12}>
            <Box sx={{ height: 300, width: "100%", background: "#fafafa", borderRadius: 2 }}>
              <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead style={{ background: "#eee" }}>
                  <tr>
                    <th>Activity Code</th>
                    <th>Activity Name</th>
                    <th>From Target Date</th>
                    <th>To Target Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 && (
                    <tr>
                      <td colSpan="4" align="center">
                        No Activities Added
                      </td>
                    </tr>
                  )}
                  {activities.map((row) => (
                    <tr key={row.id}>
                      <td>{row.activityCode}</td>
                      <td>{row.activityName}</td>
                      <td>{row.fromTargetDate}</td>
                      <td>{row.toTargetDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProjectExecutionPlanForm;
