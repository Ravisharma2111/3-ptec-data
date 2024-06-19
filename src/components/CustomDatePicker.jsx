import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { outlinedInputClasses } from "@mui/material";

const CustomDatePicker = ({ value = "2023-11-27", onChange = () => {} }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{
            ".MuiInputBase-input": {
              py: "9px",
              borderRadius: "100px !important",
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #DADADA",
              borderRadius: "15px",
            },
            [`& .${outlinedInputClasses.root}`]: { border: "1px solid #DADADA", borderRadius: "15px", backgroundColor: "transparent" },
            ".MuiSvgIcon-root ": {
              //   fontSize: "30px",
              color: "#427AAD",
              //   width: "1em",
            },
          }}
          value={dayjs(value)}
          //   onChange={(newValue) => setValue(newValue)}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
