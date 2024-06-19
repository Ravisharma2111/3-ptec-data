import React from "react";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";

const RadioLabelSX = {
  borderRadius: "8px",
  backgroundColor: "#f2f2f5",
  padding: "10px 15px",
  height: "40px",
  marginLeft: 0,
  marginRight: 0,
  border: "1px solid #0176D3",
  width: "100%",
  "& span": {
    color: "#828282",
  },
};
const LabelSelectedSX = {
  borderRadius: "8px",
  backgroundColor: "#E4F3FF",
  padding: "10px 15px",
  height: "40px",
  marginLeft: 0,
  marginRight: 0,
  border: "1px solid #0176D3",
  width: "100%",
  "& span": {
    color: "#0176D3",
  },
};

const CustomRadioGroup = ({ list, name = "", value = "", onChange = () => {} }) => {
  return (
    <RadioGroup row name={name} value={value} onChange={onChange}>
      <Stack direction={{ xs: "column", sm: "row" }} gap={"15px"} display={"flex"} flexWrap={{ xs: "wrap", sm: "nowrap" }}>
        {Object.keys(list).map((_radio, index) => {
          return (
            <FormControlLabel
              key={index}
              sx={value === list[_radio].value ? LabelSelectedSX : RadioLabelSX}
              value={list[_radio].value}
              control={
                <Radio
                  disableRipple
                  sx={{
                    pl: 0,
                  }}
                />
              }
              label={list[_radio].label}
            />
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default CustomRadioGroup;
