import React from "react";
import { Stack, TextField } from "@mui/material";

const TextBox = ({
  id = "",
  name = "",
  label = "",
  placeholder = "",
  type = "text",
  hiddenLabel = true,
  sx = {},
  labelGap = 2,
  margin = "none",
  ...rest
}) => {
  return (
    <Stack gap={labelGap}>
      {hiddenLabel && <label htmlFor={id}>{label}</label>}
      <TextField
        margin={margin}
        required
        fullWidth
        id={id}
        name={name}
        type={type}
        label={!hiddenLabel ? label : ""}
        placeholder={placeholder}
        sx={sx}
        hiddenLabel={hiddenLabel}
        {...rest}
      />
    </Stack>
  );
};

export default TextBox;
