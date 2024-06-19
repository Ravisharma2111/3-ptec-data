import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CustomCheckBox = ({ label = "", id = "", sx = {} }) => {
  return (
    <FormControlLabel
      sx={{
        width: "fit-content",
        backgroundColor: "#E4F3FF",
        border: "1px solid #0176D3",
        borderRadius: "10px",
        padding: "10px 15px",
        color: "#0176D3",
        height: "40px",
        ...sx,
      }}
      control={<Checkbox size="small" sx={{ color: "#0176D3", p: 0, pr: 1 }} />}
      id={id}
      label={label}
    />
  );
};

export default CustomCheckBox;
