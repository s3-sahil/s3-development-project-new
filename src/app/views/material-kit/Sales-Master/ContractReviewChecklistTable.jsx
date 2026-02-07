import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ContractReviewChecklistTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      checklistCode: "CHK-001",
      checklistDescription: "Quality & delivery terms verified",
      status: "Active",
    },
  ]);

  const columns = [
    { field: "checklistCode", headerName: "Checklist Code", flex: 1 },
    { field: "checklistDescription", headerName: "Checklist Description", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-contract-review-checklist-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Contract Review Checklist" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/sales-contract-review-checklist-form/add")}
        >
          New
        </Button>
      </Box>

      <Box sx={{ height: 520, width: "100%", background: "#fff", borderRadius: 2 }}>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
    </Container>
  );
};

export default ContractReviewChecklistTable;
