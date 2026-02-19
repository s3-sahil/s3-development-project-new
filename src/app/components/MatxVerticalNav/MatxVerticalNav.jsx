import { Fragment, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";

import useSettings from "app/hooks/useSettings";
import { Paragraph, Span } from "../Typography";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";

// ================= STYLED COMPONENTS =================

const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: "12px",
  marginTop: "20px",
  marginLeft: "15px",
  marginBottom: "10px",
  textTransform: "uppercase",
  display: mode === "compact" && "none",
  color: theme.palette.text.secondary
}));

const ExtAndIntCommon = {
  display: "flex",
  overflow: "hidden",
  borderRadius: "4px",
  height: 44,
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none",
  justifyContent: "space-between",
  transition: "all 150ms ease-in",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "&.compactNavItem": {
    overflow: "hidden",
    justifyContent: "center !important"
  },
  "& .icon": {
    fontSize: "18px",
    paddingLeft: "16px",
    paddingRight: "16px",
    verticalAlign: "middle"
  }
};

const ExternalLink = styled("a")(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary
}));

const InternalLink = styled(Box)(({ theme }) => ({
  "& a": {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary
  },
  "& .navItemActive": {
    backgroundColor: "rgba(255, 255, 255, 0.16)"
  }
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  display: mode === "compact" && "none"
}));

const BulletIcon = styled("div")(({ theme }) => ({
  padding: "2px",
  marginLeft: "24px",
  marginRight: "8px",
  overflow: "hidden",
  borderRadius: "300px",
  background: theme.palette.text.primary
}));

const BadgeValue = styled("div")(() => ({
  padding: "1px 8px",
  overflow: "hidden",
  borderRadius: "300px"
}));

// ================= COMPONENT =================

export default function MatxVerticalNav({ items }) {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;

  const [search, setSearch] = useState("");

  // ✅ ONLY TOP-LEVEL FILTER (NO SUBMENU TOUCH)
  const filteredItems = useMemo(() => {
    if (!search) return items;

    const lower = search.toLowerCase();

    return items.filter((item) =>
      item.name?.toLowerCase().includes(lower)
    );
  }, [items, search]);

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === "label")
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else if (item.type === "extLink") {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            className={`${mode === "compact" && "compactNavItem"}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ButtonBase key={item.name} name="child" sx={{ width: "100%" }}>
              {item.icon ? (
                <Icon className="icon">{item.icon}</Icon>
              ) : (
                <span className="item-icon icon-text">{item.iconText}</span>
              )}

              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>

              <Box mx="auto" />
              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </ButtonBase>
          </ExternalLink>
        );
      } else {
        return (
          <InternalLink key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `navItemActive ${mode === "compact" && "compactNavItem"}`
                  : `${mode === "compact" && "compactNavItem"}`
              }
            >
              <ButtonBase key={item.name} name="child" sx={{ width: "100%" }}>
                {item?.icon ? (
                  <Icon className="icon" sx={{ width: 36 }}>
                    {item.icon}
                  </Icon>
                ) : (
                  <Fragment>
                    <BulletIcon
                      className="nav-bullet"
                      sx={{ display: mode === "compact" && "none" }}
                    />
                    <Box
                      className="nav-bullet-text"
                      sx={{
                        ml: "20px",
                        fontSize: "11px",
                        display: mode !== "compact" && "none"
                      }}
                    >
                      {item.iconText}
                    </Box>
                  </Fragment>
                )}

                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </StyledText>

                <Box mx="auto" />

                {item.badge && (
                  <BadgeValue className="sidenavHoverShow">
                    {item.badge.value}
                  </BadgeValue>
                )}
              </ButtonBase>
            </NavLink>
          </InternalLink>
        );
      }
    });
  };

  return (
    <div className="navigation">
      {/* 🔍 MAIN MENU SEARCH */}
      <Box px={2} py={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* ✅ Use filteredItems (TOP LEVEL ONLY) */}
      {renderLevels(filteredItems)}
    </div>
  );
}