import React from "react";
import { Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { get, size } from "lodash";

const TextBox = ({
  control = false,
  name = "",
  label = "",
  placeholder = "",
  type = "text",
  hiddenLabel = true,
  sx = {},
  labelGap = 2,
  margin = "none",
  required = false,
  fullWidth = true,
  ...rest
}) => {
  return (
    <Stack gap={labelGap}>
      {hiddenLabel && <label htmlFor={name}>{label}</label>}
      <Controller
        render={({ field, fieldState: { error } }) => (
          <TextField
            margin={margin}
            required={required}
            fullWidth
            id={name}
            type={type}
            label={!hiddenLabel ? label : ""}
            placeholder={placeholder}
            error={size(get(error, "message", "")) > 0 ? true : false}
            sx={{
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
              },
              ...sx,
            }}
            hiddenLabel={hiddenLabel}
            {...field}
            {...rest}
            helperText={get(error, "message", "")}
          />
        )}
        name={name}
        control={control}
      />
    </Stack>
  );
};

export default TextBox;
