import { Fragment, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "@mui/material/styles/styled";

import useSettings from "app/hooks/useSettings";
import { Paragraph, Span } from "../Typography";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";

/* ===================== STYLED COMPONENTS ===================== */

const ListLabel = styled(Paragraph)(({ theme }) => ({
  fontSize: 11,
  fontWeight: 600,
  margin: "16px 18px 6px",
  letterSpacing: 1,
  color: "rgba(255,255,255,0.6)",
}));

const NavItem = styled(Box)(({ theme }) => ({
  margin: "2px 12px", // tighter vertical spacing
  borderRadius: 8,

  "& a": {
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 38, // reduced height
    padding: "0 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap", // prevent wrapping
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgba(255,255,255,0.85)",
    transition: "all 0.2s ease",
  },

  "& a:hover": {
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  "& .navItemActive": {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderLeft: "3px solid #60a5fa",
    paddingLeft: "13px", // adjust because of border
  },
}));

const NavIcon = styled(Icon)(() => ({
  fontSize: 18,
  width: 28,
  display: "flex",
  justifyContent: "center",
}));

const NavText = styled(Span)(({ mode }) => ({
  flex: 1,
  display: mode === "compact" ? "none" : "block",
}));

const NavBadge = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  fontSize: 11,
  fontWeight: 600,
  padding: "2px 8px",
  borderRadius: 20,
}));

/* ===================== COMPONENT ===================== */

export default function MatxVerticalNav({ items, onItemClick }) {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;

  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lower = search.toLowerCase();
    return items.filter((item) => item.name?.toLowerCase().includes(lower));
  }, [items, search]);

  const renderLevels = (data) =>
    data.map((item, index) => {
      if (item.type === "label") {
        return (
          <ListLabel key={index} mode={mode}>
            {item.label}
          </ListLabel>
        );
      }

      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index} onItemClick={onItemClick}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      }

      if (item.type === "extLink") {
        return (
          <NavItem key={index}>
            <a
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className={mode === "compact" ? "compactNavItem" : ""}
              onClick={() => onItemClick && onItemClick(item)}
            >
              {item.icon && <NavIcon>{item.icon}</NavIcon>}
              <NavText mode={mode}>{item.name}</NavText>
              {item.badge && <NavBadge>{item.badge.value}</NavBadge>}
            </a>
          </NavItem>
        );
      }

      return (
        <NavItem key={index}>
          <NavLink
            to={item.path}
            onClick={() => onItemClick && onItemClick(item)} // ✅ ADD THIS
            className={({ isActive }) => (isActive ? "navItemActive" : "")}
          >
            {/* Fixed left spacing for alignment */}
            <Box
              sx={{
                width: item.isChild ? 20 : 0,
                display: mode === "compact" ? "none" : "block",
              }}
            />

            {item.icon ? (
              <NavIcon>{item.icon}</NavIcon>
            ) : (
              <Box
                sx={{
                  width: 28, // same width as NavIcon
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "text.primary",
                  }}
                />
              </Box>
            )}

            <NavText mode={mode}>{item.name}</NavText>

            {item.badge && <NavBadge>{item.badge.value}</NavBadge>}
          </NavLink>
        </NavItem>
      );
    });

  return (
    <Box>
      {/* SEARCH */}
      <Box px={2} py={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small">search</Icon>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {renderLevels(filteredItems)}
    </Box>
  );
}
