import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { InputAdornment, outlinedInputClasses } from "@mui/material";
import allImgPaths from "../assets/images/allImgPaths";
import { get } from "lodash";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const SearchBox = ({
  hideIcon = false,
  loading = false,
  options = [],
  open = false,
  onOpen = () => {},
  onClose = () => {},
  onChange = () => {},
  onSearchChange = () => {},
  searchValue = "",
  optionValue = "",
  fullWidth = true,
  ...rest
}) => {
  return (
    <Autocomplete
      fullWidth={fullWidth}
      value={optionValue}
      onInputChange={onSearchChange}
      inputValue={searchValue}
      onChange={onChange}
      id="asynchronous-search"
      sx={{ height: "46px" }}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      isOptionEqualToValue={(option, value) => option.label === value.value}
      getOptionLabel={(option) => get(option, "label", "")}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          fullWidth={fullWidth}
          {...params}
          sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "10px",
            "& .MuiOutlinedInput-input": {
              zIndex: 1,
              padding: "0 !important",
            },
            [`& .${outlinedInputClasses.root}`]: {
              height: "46px",
              padding: "8.5px 14px",
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#F0F0F0",
            },
            "& .MuiSvgIcon-root": {
              zIndex: 11,
            },
          }}
          placeholder="Search"
          //   label="Search"
          //   inputProps={{ "aria-label": "search" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: !hideIcon && (
              <InputAdornment position="start">
                <img src={allImgPaths.search} alt="search" style={{ zIndex: 11 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} style={{ zIndex: 11, color: "#837878" }} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
export default SearchBox;
