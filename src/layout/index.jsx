import React from "react";
import { Grid } from "@mui/material";
import { layout } from "../theme";
import NavBar from "./Navbar";
import Drawer from "./Drawer";

const ContainerSx = {
  height: "100%",
  minHeight: `calc(100vh - ${layout.navbarHeight})`,
  backgroundColor: "#F0FBFF",
  paddingTop: "21px",
  paddingRight: { xs: 0, md: "40px" },
};
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Grid container sx={ContainerSx}>
        <Grid item xs={0} md={2} sx={{ display: { xs: "none", md: "block" } }}>
          <Drawer />
        </Grid>
        <Grid item xs={12} md={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
