import React from "react";
import { Stack, Typography } from "@mui/material";

const Header = ({ title = "" }) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <Typography variant="h4" fontSize={"28px"} fontWeight={"bold"}>
        {title}
      </Typography>
    </Stack>
  );
};

export default Header;
