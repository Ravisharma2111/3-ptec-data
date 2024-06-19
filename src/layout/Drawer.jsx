import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse, Box, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import allImgPaths from "../assets/images/allImgPaths";
import { Paths } from "../shared/constants";

const ListItemSelectedButtonSx = {
  gap: "5px",
  width: "100%",
  marginLeft: "auto",
  borderRadius: "27px 0px 0px 27px",
  height: "54px",
  "&.Mui-selected": {
    background: "#CDE9FF",
    borderRight: "3.714px solid #0176D3",
  },
};
const ListItemInactiveButtonSx = {
  gap: "5px",
  width: "100%",
  marginLeft: "auto",
  borderRadius: "27px 0px 0px 27px",
  height: "54px",
};

const ListItemTextSx = {
  "& .MuiTypography-root": {
    fontSize: { xs: "1.2vw", lg: "16px" },
    fontWeight: 400,
  },
};

const ListItemTextSelectedSx = {
  "& .MuiTypography-root": {
    fontSize: { xs: "1.2vw", lg: "16px" },
    fontWeight: 500,
    color: "#0176D2",
  },
};

const Drawer = () => {
  const { pathname } = useLocation();
  const [subSalesListOpen, setSalesSubListOpen] = useState(pathname.includes(Paths.sales.base));
  const [subAdministrationListOpen, setAdministrationSubListOpen] = useState(pathname.includes(Paths.administration.base));

  const handleSalesClick = () => {
    setSalesSubListOpen(!subSalesListOpen);
    setAdministrationSubListOpen(false);
  };
  const handleAdministrationClick = () => {
    setAdministrationSubListOpen(!subAdministrationListOpen);
    setSalesSubListOpen(false);
  };

  const SubListButton = ({ path, title }) => {
    return (
      <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + path}>
        <ListItemText sx={pathname === "/" + path ? ListItemTextSelectedSx : ListItemTextSx} primary={title} />
      </ListItemButton>
    );
  };
  const SalesManagement = () => {
    return (
      <>
        <ListItemButton
          selected={pathname.includes(Paths.sales.base)}
          onClick={handleSalesClick}
          sx={Paths.sales.base ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
        >
          <Box display={{ md: "none", lg: "block" }}>
            <img src={allImgPaths.salesManagement} alt="sales-management" />
          </Box>
          <ListItemText
            primary="Sales Management"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: Paths.sales.base ? 500 : 400,
                fontSize: { xs: "1.2vw", lg: "16px" },
              },
            }}
          />
        </ListItemButton>
        <Collapse in={subSalesListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ ml: "30px", gap: "10px", display: "flex", flexDirection: "column" }}>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.order}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.order ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Order Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.invoice}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.invoice ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Invoice Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.purchase}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.purchase ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Purchase Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.stock}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.stock ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Stock Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.item}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.item ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Item Mapping"
              />
            </ListItemButton>
          </List>
        </Collapse>
      </>
    );
  };

  const Admininstration = () => {
    return (
      <>
        <ListItemButton
          selected={pathname.includes(Paths.administration.base)}
          onClick={handleAdministrationClick}
          sx={Paths.administration.base ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
        >
          <Box display={{ md: "none", lg: "block" }}>
            <img src={allImgPaths.administration} alt="administration" />
          </Box>
          <ListItemText
            primary="Administration"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: Paths.sales.base ? 500 : 400,
                fontSize: { xs: "1.2vw", lg: "16px" },
              },
            }}
          />
        </ListItemButton>
        <Collapse in={subAdministrationListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ ml: "30px", gap: "10px", display: "flex", flexDirection: "column" }}>
            <SubListButton path={Paths.administration.base + Paths.administration.orgStructure} title={"Org Structure"} />
            <SubListButton path={Paths.administration.base + Paths.administration.connector} title={"Connector"} />
            <SubListButton path={Paths.administration.base + Paths.administration.emailReports} title={"Email Reports"} />
            <SubListButton path={Paths.administration.base + Paths.administration.zones} title={"Zones"} />
            <SubListButton path={Paths.administration.base + Paths.administration.files} title={"Files"} />
            <SubListButton path={Paths.administration.base + Paths.administration.itemMaster} title={"Item Master"} />
            <SubListButton path={Paths.administration.base + Paths.administration.taxes} title={"Taxes"} />
            <SubListButton path={Paths.administration.base + Paths.administration.routes} title={"Routes"} />
            <SubListButton path={Paths.administration.base + Paths.administration.users} title={"Users"} />
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <Box
      padding={"30px 0px"}
      sx={{
        boxShadow: "0px 5px 40px 0px rgba(0, 0, 0, 0.15)",
        borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Stack gap={"10px"} sx={{ maxWidth: "260px", marginLeft: "auto" }}>
        <ListItemButton
          selected={pathname === Paths.dashboard}
          sx={pathname === Paths.dashboard ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
          LinkComponent={Link}
          to={Paths.dashboard}
        >
          <Box display={{ md: "none", lg: "block" }}>
            <img src={allImgPaths.dashboard} alt="dashboard" />
          </Box>
          <ListItemText sx={pathname === Paths.dashboard ? ListItemTextSelectedSx : ListItemTextSx} primary="Dashboard" />
        </ListItemButton>
        <Admininstration />
        <SalesManagement />
        <ListItemButton
          selected={pathname === Paths.reports}
          sx={pathname === Paths.reports ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
          LinkComponent={Link}
          to={Paths.reports}
        >
          <Box display={{ md: "none", lg: "block" }}>
            <img src={allImgPaths.reports} alt="reports" />
          </Box>
          <ListItemText sx={pathname === Paths.reports ? ListItemTextSelectedSx : ListItemTextSx} primary="Reports" />
        </ListItemButton>
      </Stack>
    </Box>
  );
};

export default Drawer;
