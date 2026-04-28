// UOMTable.jsx
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from "@mui/material";

export default function UOMTable({ rows }) {
  return (
    <Box
      sx={{
        border: "1px solid #777",
        background: "#fff",
        maxHeight: 250,
        overflow: "auto",
      }}
    >
      <Typography sx={{ p: 1, fontWeight: "bold" }}>
        UOM List
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ background: "#e0e0e0" }}>
            <TableCell>UOM</TableCell>
            <TableCell>UOM Desc</TableCell>
            <TableCell>Decimal Applicable</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.uom}</TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.decimal ? "Y" : "N"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* FOOTER BUTTONS */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>
            NEW
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }}>
            EDIT
          </Button>
          <Button variant="outlined">
            DEL
          </Button>
        </Box>

        <Button variant="contained" color="error">
          QUIT
        </Button>
      </Box>
    </Box>
  );
}