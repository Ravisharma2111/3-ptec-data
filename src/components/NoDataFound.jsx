import React from "react";
import { Grid, Typography } from "@mui/material";

const NoDataFound = ({ message = "No data found" }) => {
  return (
    <Grid container rowSpacing={"16px"}>
      <Grid item xs={12}>
        <Typography textAlign={"center"}>{message}</Typography>
      </Grid>
    </Grid>
  );
};

export default NoDataFound;
