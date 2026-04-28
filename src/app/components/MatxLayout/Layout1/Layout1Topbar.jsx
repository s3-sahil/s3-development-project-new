import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import WebAsset from "@mui/icons-material/WebAsset";
import MailOutline from "@mui/icons-material/MailOutline";
import StarOutline from "@mui/icons-material/StarOutline";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, MatxSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";
import { TextField } from "@mui/material";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease",
});

const TopbarContainer = styled("div")(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
}));

const UserMenu = styled("div")({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" },
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [financeYears, setFinanceYears] = useState([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    setFromDate(`${year}-04-01`);
    setToDate(`${year + 1}-03-31`);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const financeYearData = userData?.JsonData?.FINANCE_YEAR || [];

    setFinanceYears(financeYearData);

    // ✅ check if already saved in localStorage
    const savedFrom = localStorage.getItem("fromDate");
    const savedTo = localStorage.getItem("toDate");

    if (savedFrom && savedTo) {
      setFromDate(savedFrom);
      setToDate(savedTo);
    } else if (financeYearData.length > 0) {
      const firstFY = financeYearData[0];

      const from = formatFYDate(firstFY.FROM_DATE, true);
      const to = formatFYDate(firstFY.TO_DATE, false);

      setFromDate(from);
      setToDate(to);

      // ✅ store default
      localStorage.setItem("fromDate", from);
      localStorage.setItem("toDate", to);
    }
  }, []);
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const formatFYDate = (value, isFrom) => {
    if (!value) return "";

    const [month, year] = value.split("/");

    if (isFrom) {
      return `${year}-${month}-01`; // 2008-04-01
    } else {
      return `${year}-${month}-31`; // 2009-03-31
    }
  };
  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const storedDivisions = JSON.parse(localStorage.getItem("divisions")) || [];
    let savedDivision = localStorage.getItem("selectedDivision");
    let profileName = localStorage.getItem("login_name");

    if (!savedDivision && storedDivisions.length > 0) {
      savedDivision = storedDivisions[0].PROFCEN_CD;
      localStorage.setItem("selectedDivision", savedDivision);
    }

    // ✅ Sort: Move selected division to the first position
    const sortedDivisions = storedDivisions.sort((a, b) =>
      a.PROFCEN_CD === savedDivision
        ? -1
        : b.PROFCEN_CD === savedDivision
          ? 1
          : 0,
    );

    setDivisions(sortedDivisions);
    setSelectedDivision(savedDivision);
    setProfileName(profileName);
  }, []);

  const handleDivisionChange = (division) => {
    const selected = division.PROFCEN_CD;

    setSelectedDivision(selected);

    localStorage.setItem("selectedDivision", selected);

    // ✅ optional: update userData also (recommended)
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.PROFCEN_CD = selected;
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const hidePeriod = localStorage.getItem("hidePeriod") === "true";
  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>
        </Box>
        {/* <Box display="flex" gap={2}>
          <TextField
            select
            label="From Date"
            fullWidth
            value={fromDate}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#fff",
                color: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-root.Mui-disabled *": {
                cursor: "text !important", // ✅ force override all children
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc !important",
              },
            }}
            onChange={(e) => {
              const selected = financeYears.find(
                (fy) => formatFYDate(fy.FROM_DATE, true) === e.target.value,
              );

              if (selected) {
                const from = formatFYDate(selected.FROM_DATE, true);
                const to = formatFYDate(selected.TO_DATE, false);

                setFromDate(from);
                setToDate(to);

                // ✅ save to localStorage
                localStorage.setItem("fromDate", from);
                localStorage.setItem("toDate", to);
              }
            }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.FROM_DATE, true)}>
                {fy.FROM_DATE}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="To Date"
            fullWidth
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            disabled
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#fff",
                color: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-root.Mui-disabled *": {
                cursor: "text !important", // ✅ force override all children
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc !important",
              },
            }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.TO_DATE, false)}>
                {fy.TO_DATE}
              </MenuItem>
            ))}
          </TextField>
        </Box> */}
        {/* <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Span>
                  Hi <strong>{profileName}</strong>
                </Span>

                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            {divisions.map((division) => {
              const isSelected = division.PROFCEN_CD === selectedDivision;

              return (
                <StyledItem
                  key={division.PROFCEN_CD}
                  onClick={() => handleDivisionChange(division)}
                  sx={{
                    backgroundColor: isSelected ? "#60a5fa" : "transparent",
                  }}
                >
                  <Person />
                  <Span
                    sx={{
                      marginInlineStart: 1,
                      color: isSelected ? "white" : "inherit",
                    }}
                  >
                    {division.DESC}
                  </Span>
                </StyledItem>
              );
            })}
          </MatxMenu>
          <TextField
            select
            label="From Date"
            fullWidth
            value={fromDate}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#fff",
                color: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-root.Mui-disabled *": {
                cursor: "text !important", // ✅ force override all children
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc !important",
              },
            }}
            onChange={(e) => {
              const selected = financeYears.find(
                (fy) => formatFYDate(fy.FROM_DATE, true) === e.target.value,
              );

              if (selected) {
                const from = formatFYDate(selected.FROM_DATE, true);
                const to = formatFYDate(selected.TO_DATE, false);

                setFromDate(from);
                setToDate(to);

                // ✅ save to localStorage
                localStorage.setItem("fromDate", from);
                localStorage.setItem("toDate", to);
              }
            }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.FROM_DATE, true)}>
                {fy.FROM_DATE}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="To Date"
            fullWidth
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            disabled
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                backgroundColor: "#fff",
                color: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000",
                cursor: "text !important",
              },
              "& .MuiInputBase-root.Mui-disabled *": {
                cursor: "text !important", // ✅ force override all children
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc !important",
              },
            }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.TO_DATE, false)}>
                {fy.TO_DATE}
              </MenuItem>
            ))}
          </TextField>
        </Box> */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ flexWrap: "wrap" }}
        >
          {/* 👤 USER MENU */}
          <MatxMenu
            menuButton={
              <UserMenu>
                <Span>
                  Hi <strong>{profileName}</strong>
                </Span>
                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            {divisions.map((division) => {
              const isSelected = division.PROFCEN_CD === selectedDivision;

              return (
                <StyledItem
                  key={division.PROFCEN_CD}
                  onClick={() => handleDivisionChange(division)}
                  sx={{
                    backgroundColor: isSelected ? "#60a5fa" : "transparent",
                  }}
                >
                  <Person />
                  <Span
                    sx={{
                      marginInlineStart: 1,
                      color: isSelected ? "white" : "inherit",
                    }}
                  >
                    {division.DESC}
                  </Span>
                </StyledItem>
              );
            })}
          </MatxMenu>
{!hidePeriod && (
<>
          {/* 📅 FROM DATE */}
          <TextField
            select
            label="From"
            size="small"
            value={fromDate}
            sx={{ minWidth: 140, background: "#fff", borderRadius: 1 }}
            onChange={(e) => {
              const selected = financeYears.find(
                (fy) => formatFYDate(fy.FROM_DATE, true) === e.target.value,
              );

              if (selected) {
                const from = formatFYDate(selected.FROM_DATE, true);
                const to = formatFYDate(selected.TO_DATE, false);

                setFromDate(from);
                setToDate(to);

                localStorage.setItem("fromDate", from);
                localStorage.setItem("toDate", to);
              }
            }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.FROM_DATE, true)}>
                {fy.FROM_DATE}
              </MenuItem>
            ))}
          </TextField>

          {/* 📅 TO DATE */}
          <TextField
            select
            label="To"
            size="small"
            value={toDate}
            disabled
            sx={{ minWidth: 140, background: "#fff", borderRadius: 1 }}
          >
            {financeYears.map((fy, index) => (
              <MenuItem key={index} value={formatFYDate(fy.TO_DATE, false)}>
                {fy.TO_DATE}
              </MenuItem>
            ))}
          </TextField>
          </>)}
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
