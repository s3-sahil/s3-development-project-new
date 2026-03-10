import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TMSParameterPaginationAPI } from "app/utils/authServices";

export default function TMSParameterTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await TMSParameterPaginationAPI(
        "TMS_PARA",
        page + 1,
        pageSize,
      );

      const data = response?.Data || [];

      const formattedRows = data.map((item,index) => ({
        id: item.PROFCEN_CD,
        srNo: index + 1,
        division: item.PROFCEN_CD,
        shiftPlanApplicable: item.Shift_Plan_Appl ? "Yes" : "No",
        holidayShiftGen: item.Shift_Plan_PH === "Y" ? "Yes" : "No",
        punchingFileFlag: item.InOut_Flag ? "Yes" : "No",
        fullData: item,
      }));

      setRows(formattedRows);
      setTotalRows(response?.TotalCount || 0);
    } catch (error) {
      console.error("Table fetch error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, location.state]);

  const columns = [
     { field: "srNo", headerName: "Sr No", width: 100 },
    { field: "division", headerName: "Division", width: 120 },
    {
      field: "shiftPlanApplicable",
      headerName: "Shift Plan Applicable",
      width: 200,
    },
    {
      field: "holidayShiftGen",
      headerName: "Holiday While Shift Generation",
      width: 250,
    },
    {
      field: "punchingFileFlag",
      headerName: "Punching File With In Out Flag",
      width: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TMS-parameter-form/edit/${params.row.srNo}`, {
                  state: params.row.fullData,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() => alert(`Delete Division ${params.row.division}`)}
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "TMS Parameter Table" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-parameter-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalRows}
            loading={loading}
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}
