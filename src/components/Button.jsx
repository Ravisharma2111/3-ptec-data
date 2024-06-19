import { Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({
  label = "",
  classes = "",
  sx = {},
  varient = "contained",
  fullWidth = true,
  size = "medium",
  onClick = () => {},
  isLoading = false,
  loaderStyle = {},
  loaderSize = "28px",
  ...rest
}) => {
  return (
    <Button
      className={classes}
      sx={{ borderRadius: "23px", boxShadow: "0px 2px 15px 2px rgba(0, 44, 106, 0.25)", fontSize: "16px", padding: "14px 49px", ...sx }}
      size={size}
      variant={varient}
      fullWidth={fullWidth}
      onClick={(e) => {
        !isLoading && onClick(e);
      }}
      {...rest}
    >
      {isLoading ? <CircularProgress sx={{ color: "#fff", ...loaderStyle }} size={loaderSize} /> : label}
    </Button>
  );
};

export default CustomButton;
