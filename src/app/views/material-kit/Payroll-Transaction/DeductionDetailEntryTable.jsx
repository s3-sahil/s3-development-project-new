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

export default function DeductionDetailEntryTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, employeeNo: "00221", period: "012022", societyContri: "-", societyLoan: "-", miscDed3: "-", licInstallment: "-", division: "2" },
    { id: 2, employeeNo: "00223", period: "012022", societyContri: "-", societyLoan: "-", miscDed3: "-", licInstallment: "-", division: "2" },
    { id: 3, employeeNo: "00018", period: "102022", societyContri: "-", societyLoan: "-", miscDed3: "-", licInstallment: "-", division: "2" },
  ];

  const handleEdit = (row) => {
    navigate(`/material/payroll-deduction-detail-entry-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-deduction-detail-entry-form/add");
  };

  const columns = [
    { field: "employeeNo", headerName: "Employee No", width: 150 },
    { field: "period", headerName: "Period", width: 150 },
    { field: "societyContri", headerName: "Society Contri", width: 150 },
    { field: "societyLoan", headerName: "Society Loan", width: 150 },
    { field: "miscDed3", headerName: "Misc Ded.3", width: 150 },
    { field: "licInstallment", headerName: "LIC Installment", width: 150 },
    { field: "division", headerName: "Division", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
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
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Deduction Detail Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}