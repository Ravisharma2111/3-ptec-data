import React, { useEffect, useState } from "react";
import { Button, Grid, Stack, Typography, outlinedInputClasses } from "@mui/material";
import SecondarySelect from "../../../../../components/SecondarySelect";
import TextBox from "../../../../../components/TextBox";
import { CustomButton } from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import  { FetchAdminAvialableZones } from "../../../../../redux/actions/sales/order";



const AddRoute = () => {
  const dispatch = useDispatch();
   const [viewShowRoute, setViewShowRoute] = useState([]);
   const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleAdminRoutesZones = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          entityId: "",
        };

        const result = await dispatch(FetchAdminAvialableZones(payload));
        setViewShowRoute(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleAdminRoutesZones();
  }, [items]);

  console.log("viewShowRoute", viewShowRoute);


  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Select Zone" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Sales Executive" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Customer Type" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SecondarySelect label="Frequency Type" required />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color={"#121212"} fontWeight={"300"}>
          Route Name
        </Typography>
        <TextBox
          labelGap={0}
          name="routeName"
          placeholder="Route Name"
          id="routeName"
          margin="dense"
          sx={{
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
          }}
        />
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Stack mt={"10px"}>
          <CustomButton
            label="Create Route"
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

export default AddRoute;
