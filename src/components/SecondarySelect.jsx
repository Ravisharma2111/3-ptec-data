import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography, outlinedInputClasses } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SecondarySelect = ({
  fullWidth = true,
  options = [],
  id = "",
  name,
  label = "",
  hideLabel = false,
  size = "small",
  onChange = () => {},
  value = "",
  sx = {},
  required = false,
  formLabelSx,
  ...rest
}) => {
  return (
    <Stack gap={"10px"}>
      {!hideLabel && (
        <Typography color={"#121212"} fontWeight={"300"}>
          {label}
          {required && "*"}
        </Typography>
      )}
      <FormControl fullWidth={fullWidth} size={size}>
        {/* <InputLabel sx={formLabelSx} id={id}>
          {label}
        </InputLabel> */}
        <Select
          required={required}
          name={name}
          sx={{
            height: "46px",
            backgroundColor: "#F0F0F0",
            border: "none",
            [`& .${outlinedInputClasses.notchedOutline}`]: { border: "none" },
            borderRadius: "10px",
            color: "#848484",
            ".MuiSvgIcon-root ": {
              fontSize: "32px",
              color: "#828282",
              width: "1.5em",
            },
            ...sx,
          }}
          labelId={id}
          id={id}
          onChange={onChange}
          value={value}
          IconComponent={ExpandMoreIcon}
          // label={label}
          displayEmpty
          {...rest}
        >
          {/* {value === "Select" && ( */}
          <MenuItem value={""} disabled>
            Select
          </MenuItem>
          {/* )} */}
          {options?.map(({ label, value }, index) => (
            <MenuItem value={value} key={index}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SecondarySelect;
