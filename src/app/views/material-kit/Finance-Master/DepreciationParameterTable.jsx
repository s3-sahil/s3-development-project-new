import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DepreciationParameterTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, mode: "Group Wise", groupCode: "GRP01", subGroup: "Machinery", depreciation: "10%", companyAct: "12%", incomeTax: "15%" },
    { id: 2, mode: "GL Code Wise", groupCode: "GL001", subGroup: "Cash Account", depreciation: "5%", companyAct: "6%", incomeTax: "10%" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "mode", headerName: "Mode", flex: 1 },
    { field: "groupCode", headerName: "Group Code / GL Code", flex: 1 },
    { field: "subGroup", headerName: "Sub Group", flex: 2 },
    { field: "depreciation", headerName: "Depreciation %", flex: 1 },
    { field: "companyAct", headerName: "As per Company Act", flex: 1 },
    { field: "incomeTax", headerName: "As per Income Tax", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/finance/depreciation-parameter-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Depreciation Parameter" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/finance/depreciation-parameter-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
        </Box>
      </Stack>
    </Container>
  );
}