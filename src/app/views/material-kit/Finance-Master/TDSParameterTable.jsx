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

export default function TDSParameterTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, applicableGL: "GL1001", tdsGL: "GL2001", certificateType: "Form 16A", section: "194C", companyTDS: "10%", nonCompanyTDS: "7.5%", nonItrCompanyTDS: "12%", nonItrNonCompanyTDS: "15%" },
    { id: 2, applicableGL: "GL1002", tdsGL: "GL2002", certificateType: "Form 16B", section: "194J", companyTDS: "5%", nonCompanyTDS: "10%", nonItrCompanyTDS: "20%", nonItrNonCompanyTDS: "25%" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "applicableGL", headerName: "Applicable GL Code", flex: 1 },
    { field: "tdsGL", headerName: "TDS GL Code", flex: 1 },
    { field: "certificateType", headerName: "Certificate Type", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "companyTDS", headerName: "Company TDS %", flex: 1 },
    { field: "nonCompanyTDS", headerName: "Non Company TDS %", flex: 1 },
    { field: "nonItrCompanyTDS", headerName: "NON ITR Company TDS %", flex: 1 },
    { field: "nonItrNonCompanyTDS", headerName: "NON ITR Non Company TDS %", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-TDS-parameter-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "TDS Parameter" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-TDS-parameter-form/add")}
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