import React from "react";
import { Box } from "@mui/material";

const CardSx = {
  boxShadow: "0px 15px 40px 0px rgba(0, 0, 0, 0.05)",
  marginLeft: { sm: 0, md: "19px" },
  borderRadius: "15px",
  backgroundColor: "#fff",
  height: "100%",
  padding: { xs: "20px", md: "30px" },
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const Card = ({ children }) => {
  return <Box sx={CardSx}>{children}</Box>;
};

export default Card;
