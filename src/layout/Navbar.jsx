import React, { Fragment, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import allImgPaths from "../assets/images/allImgPaths";
import { layout } from "../theme";
import { CustomButton } from "../components";
import { AppInfo, Paths } from "../shared/constants";
import { logout } from "../redux/actions/authentication/auth";

// const drawerMenus = [
//   { title: "Reports", icon: allImgPaths.reports, path: Paths.reports },
//   { title: "Order Management", icon: allImgPaths.salesManagement, path: "/" + Paths.sales.base + Paths.sales.order },
// ];

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
    fontSize: "16px",
    fontWeight: 400,
  },
};

const ListItemTextSelectedSx = {
  "& .MuiTypography-root": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#0176D2",
  },
};

const UsernameButtonSx = {
  color: "#0176D3",
  backgroundColor: "#FFF",
  padding: "5px 10px",
  fontSize: "12px",
  textTransform: "none",
  boxShadow: "none",
  borderRadius: "19px",
  height: "28px",
  "&:hover": {
    backgroundColor: "#F1F1F1",
  },
};
function NavBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const SalesManagement = () => {
    return (
      <>
        <ListItemButton
          selected={pathname.includes(Paths.sales.base)}
          onClick={handleSalesClick}
          sx={pathname.includes(Paths.sales.base) ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
        >
          <img src={allImgPaths.salesManagement} alt="sales-management" />
          <ListItemText
            primary="Sales Management"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: pathname.includes(Paths.sales.base) ? 500 : 400,
                fontSize: "16px",
              },
            }}
          />
        </ListItemButton>
        <Collapse in={subSalesListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ ml: "30px", gap: "10px", display: "flex", flexDirection: "column" }}>
            <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} onClick={toggleDrawer} to={"/" + Paths.sales.base + Paths.sales.order}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.order ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Order Management"
              />
            </ListItemButton>
            <ListItemButton
              sx={ListItemInactiveButtonSx}
              onClick={toggleDrawer}
              LinkComponent={Link}
              to={"/" + Paths.sales.base + Paths.sales.invoice}
            >
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.invoice ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Invoice Management"
              />
            </ListItemButton>
            <ListItemButton
              sx={ListItemInactiveButtonSx}
              onClick={toggleDrawer}
              LinkComponent={Link}
              to={"/" + Paths.sales.base + Paths.sales.purchase}
            >
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.purchase ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Purchase Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} onClick={toggleDrawer} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.stock}>
              <ListItemText
                sx={pathname === "/" + Paths.sales.base + Paths.sales.stock ? ListItemTextSelectedSx : ListItemTextSx}
                primary="Stock Management"
              />
            </ListItemButton>
            <ListItemButton sx={ListItemInactiveButtonSx} onClick={toggleDrawer} LinkComponent={Link} to={"/" + Paths.sales.base + Paths.sales.item}>
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

  const SubListButton = ({ path, title }) => {
    return (
      <ListItemButton sx={ListItemInactiveButtonSx} LinkComponent={Link} onClick={toggleDrawer} to={"/" + path}>
        <ListItemText sx={pathname === "/" + path ? ListItemTextSelectedSx : ListItemTextSx} primary={title} />
      </ListItemButton>
    );
  };

  const Administration = () => {
    return (
      <>
        <ListItemButton
          selected={pathname.includes(Paths.administration.base)}
          onClick={handleAdministrationClick}
          sx={pathname.includes(Paths.administration.base) ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
        >
          <img src={allImgPaths.administration} alt="administration" />
          <ListItemText
            primary="Administration"
            sx={{
              "& .MuiTypography-root": {
                fontWeight: pathname.includes(Paths.sales.base) ? 500 : 400,
                fontSize: "16px",
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

  const list = (anchor) => (
    <Box sx={{ width: 300, paddingY: "20px" }} role="presentation">
      <Stack gap={"10px"} sx={{ maxWidth: "260px", marginLeft: "auto" }}>
        <ListItemButton
          onClick={toggleDrawer}
          selected={pathname === Paths.dashboard}
          sx={pathname === Paths.dashboard ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
          LinkComponent={Link}
          to={Paths.dashboard}
        >
          <img src={allImgPaths.dashboard} alt="dashboard" />
          <ListItemText sx={pathname === Paths.dashboard ? ListItemTextSelectedSx : ListItemTextSx} primary="Dashboard" />
        </ListItemButton>
        <Administration />
        <SalesManagement />
        <ListItemButton
          onClick={toggleDrawer}
          selected={pathname === Paths.reports}
          sx={pathname === Paths.reports ? ListItemSelectedButtonSx : ListItemInactiveButtonSx}
          LinkComponent={Link}
          to={Paths.reports}
        >
          <img src={allImgPaths.reports} alt="reports" />
          <ListItemText sx={pathname === Paths.reports ? ListItemTextSelectedSx : ListItemTextSx} primary="Reports" />
        </ListItemButton>
      </Stack>
    </Box>
  );

  // const list = (anchor) => (
  //   <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
  //     <List>
  //       {drawerMenus.map(({ icon, title, path }, index) => (
  //         <ListItem key={title} disablePadding>
  //           <ListItemButton LinkComponent={Link} to={path}>
  //             {icon && (
  //               <ListItemIcon>
  //                 <img src={icon} alt={title} />
  //               </ListItemIcon>
  //             )}
  //             <ListItemText primary={title} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <AppBar elevation={0} position="sticky" sx={{ height: layout.navbarHeight, display: "flex", justifyContent: "center" }}>
      <Container maxWidth={false} sx={{ paddingX: "40px !important" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img src={allImgPaths.appLogo} width={56} alt="App logo" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: 24,
            }}
          >
            {AppInfo.shortName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={toggleDrawer} disableRipple sx={{ pl: 0 }}>
              <img src={allImgPaths.menu} alt="menu" />
            </IconButton>
          </Box>

          <Fragment>
            <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
              {list()}
            </Drawer>
          </Fragment>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {AppInfo.shortName}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <CustomButton label="Username" onClick={handleOpenUserMenu} size="small" sx={UsernameButtonSx} />

            <Menu
              sx={{ backgroundColor: "rgba(40, 40, 40, 0.50)" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
