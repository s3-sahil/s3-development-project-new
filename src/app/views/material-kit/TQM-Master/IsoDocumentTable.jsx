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

export default function IsoDocumentTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, docNo: "ISO001", desc: "Quality Manual", revisionNo: "Rev1", revisionDate: "2026-01-15", indexing: "QM-01", retentionPeriod: "5 Years" },
    { id: 2, docNo: "ISO002", desc: "Work Instruction", revisionNo: "Rev2", revisionDate: "2026-02-10", indexing: "WI-02", retentionPeriod: "3 Years" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "docNo", headerName: "Doc No", flex: 1 },
    { field: "desc", headerName: "Description", flex: 2 },
    { field: "revisionNo", headerName: "Revision No", flex: 1 },
    { field: "revisionDate", headerName: "Revision Date", flex: 1 },
    { field: "indexing", headerName: "Indexing", flex: 1 },
    { field: "retentionPeriod", headerName: "Retention Period", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/tqm/iso-document-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "ISO/TS/QS Document Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/tqm/iso-document-form/add")}
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