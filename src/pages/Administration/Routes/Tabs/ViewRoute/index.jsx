import React from "react";
import { Grid } from "@mui/material";
import { SecondarySelect } from "../../../../../components";

const StatusesOptions = [
  { label: "Active", value: "value" },
  { label: "Inactive", value: "inactive" },
  { label: "Deleted", value: "deleted" },
];
const ViewRoute = () => {
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12}>
        <SecondarySelect options={StatusesOptions} value={StatusesOptions[0].value} />
      </Grid>
    </Grid>
  );
};

export default ViewRoute;
