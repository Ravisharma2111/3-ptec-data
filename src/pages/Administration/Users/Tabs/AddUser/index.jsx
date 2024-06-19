import React from "react";
import { Button, Grid, Stack, Typography, outlinedInputClasses } from "@mui/material";
import { CustomButton, CustomCheckBox, SecondarySelect, TextBox } from "../../../../../components";

const buttonSx = {
  "& .MuiOutlinedInput-input": {
    zIndex: 1,
  },
  [`& .${outlinedInputClasses.root}`]: {
    height: "46px",
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#F0F0F0",
  },
};

const AddUser = () => {
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} sm={6}>
        <TextBox label="Login Id" placeholder="Login Id" sx={buttonSx} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextBox label="First Name" placeholder="First Name" sx={buttonSx} required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextBox label="Middle Name" placeholder="Middle Name" sx={buttonSx} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextBox label="Last Name" placeholder="Last Name" sx={buttonSx} required />
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} flexDirection={{ xs: "column", md: "row" }} alignItems={{ xs: "left", md: "center" }} gap={"15px"}>
        <Typography>Application Access*</Typography>
        <Stack direction={"row"} ml={"12px"} gap={"15px"} flexWrap={"wrap"} alignItems={"center"}>
          <CustomCheckBox label="Browser" id="browser" sx={{ backgroundColor: "#EEE", color: "#828282" }} />
          <CustomCheckBox label="Mobile" id="mobile" sx={{ backgroundColor: "#EEE", color: "#828282" }} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "left", sm: "center" }} gap={"15px"}>
        <Typography>Functional Zone Details*</Typography>
        <CustomCheckBox label="All Child Zones" id="allChildZones" sx={{ backgroundColor: "#EEE", color: "#828282", ml: "1px" }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="State" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="City" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Entity Type" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Zonal Customers" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Modules" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Sub Modules" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Sub Module Features" required />
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Stack mt={"10px"}>
          <CustomButton
            label="Add User"
            sx={{ textTransform: "capitalize", maxWidth: "220px", borderRadius: "38px", padding: "16px 49px", height: "51px", fontSize: "18px" }}
          />
          <Button sx={{ textTransform: "capitalize", fontSize: "18px", mt: 1 }} size="small">
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddUser;
