import React from "react";
import { FormControl, MenuItem, Select, outlinedInputClasses } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PrimarySelect = ({
  fullWidth = true,
  id = "",
  options = [],
  name,
  size = "small",
  onChange = () => {},
  value = "Select",
  sx = {},
  defaultLabel = "Select",
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth} size={size}>
      <Select
        name={name}
        sx={{
          backgroundColor: "#E4F3FF",
          border: "1px solid #0176D3",
          [`& .${outlinedInputClasses.notchedOutline}`]: { border: "1px solid #0176D3" },
          borderRadius: "10px",
          color: "#0176D3",
          ".MuiSvgIcon-root ": {
            fontSize: "30px",
            color: "#0176D3",
            width: "1em",
          },
          ...sx,
        }}
        labelId={id}
        id={id}
        onChange={onChange}
        value={value}
        IconComponent={ExpandMoreIcon}
        {...rest}
      >
        {value === "Select" && (
          <MenuItem value={"Select"} disabled>
            {defaultLabel}
          </MenuItem>
        )}
        {options.map(({ label, value }, index) => (
          <MenuItem value={value} key={index}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PrimarySelect;
