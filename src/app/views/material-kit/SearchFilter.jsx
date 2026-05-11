// ========================== SearchFilter.jsx ==========================

import { Box, Button, MenuItem, TextField } from "@mui/material";

export default function SearchFilter({
  searchValue,
  setSearchValue,
  searchColumn,
  setSearchColumn,
  columnOptions = [],
  onSearch,
}) {
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
      mb={2}
    >
      {/* Search Input */}
      <TextField
        size="small"
        label="Search"
        placeholder="Enter search text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        sx={{ minWidth: 250 }}
      />

      {/* Column Dropdown */}
      <TextField
        size="small"
        select
        label="Column"
        value={searchColumn}
        onChange={(e) => setSearchColumn(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">Select Column</MenuItem>

        {columnOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Button */}
      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>
    </Box>
  );
}