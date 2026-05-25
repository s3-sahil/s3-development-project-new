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

export default function DbkMasterEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, tariffCode: "TC001", srNo: "1", rate: "5%", inputTariff: true, rateKg: "2.5", remark: "General", wefDate: "01/04/2025" },
    { id: 2, tariffCode: "TC002", srNo: "2", rate: "10%", inputTariff: false, rateKg: "4.0", remark: "Special", wefDate: "15/05/2025" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "tariffCode", headerName: "Tariff Code", flex: 1 },
    { field: "srNo", headerName: "Sr No", flex: 1 },
    { field: "rate", headerName: "Rate", flex: 1 },
    { field: "inputTariff", headerName: "Input Tariff", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "rateKg", headerName: "Rate/kg", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 1 },
    { field: "wefDate", headerName: "WEF Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-dbk-master-entry-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Dbk Master Entry" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-dbk-master-entry-form/add")}
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