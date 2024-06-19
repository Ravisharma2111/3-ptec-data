import React, { useEffect, useState } from "react";
import { InputAdornment, TextField, outlinedInputClasses } from "@mui/material";
import allImgPaths from "../assets/images/allImgPaths";

const SearchInput = ({ hideIcon = false,onSearch  }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    <TextField
      fullWidth
      sx={{
        backgroundColor: "#F0F0F0",
        borderRadius: "10px",
        "& .MuiOutlinedInput-input": {
          zIndex: 1,
        },
        [`& .${outlinedInputClasses.root}`]: {
          height: "46px",
        },
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#F0F0F0",
        },
      }}
      placeholder="Search"
      inputProps={{ "aria-label": "search" }}
      value={searchText}
      onChange={handleChange}
      InputProps={{
        startAdornment: !hideIcon && (
          <InputAdornment position="start">
            <img src={allImgPaths.search} alt="search" style={{ zIndex: 11 }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
