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

export default function FirstPieceApprovalTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, productCode: "P001", operationCode: "OP01", serialNo: "S001", criticalParameter: "Surface Finish", dimension: "⌀10mm", inspMethod: "Visual", range: "8-12", leastCount: "0.01", remark: "OK" },
    { id: 2, productCode: "P002", operationCode: "OP02", serialNo: "S002", criticalParameter: "Hardness", dimension: "50 HRC", inspMethod: "Tester", range: "48-52", leastCount: "0.5", remark: "Within Limit" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "operationCode", headerName: "Operation Code", flex: 1 },
    { field: "serialNo", headerName: "Serial No", flex: 1 },
    { field: "criticalParameter", headerName: "Critical Parameter", flex: 2 },
    { field: "dimension", headerName: "Dimension", flex: 1 },
    { field: "inspMethod", headerName: "Inspection Method", flex: 1 },
    { field: "range", headerName: "Range", flex: 1 },
    { field: "leastCount", headerName: "Least Count", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TQM-first-piece-approval-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "First Piece Approval" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TQM-first-piece-approval-form/add")}
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