import React, { useState } from "react";
import { Button, styled } from "@mui/material";
import allImgPaths from "../assets/images/allImgPaths";

const StyledDiv = styled("div")(() => ({
  position: "fixed",
  right: "56px",
  bottom: "36px",
}));

const StyledButton = styled(Button)(({ style }) => ({
  backgroundColor: "#FFF",
  borderRadius: "55px",
  width: "59px",
  height: "59px",
  boxShadow: "0px 4px 12px 0px rgba(1, 118, 211, 0.20)",
  "&:hover": {
    backgroundColor: "#FFF",
  },
  ...style,
}));

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <StyledDiv>
      <StyledButton variant="contained" onClick={scrollToTop} style={{ display: visible ? "flex" : "none" }}>
        <img src={allImgPaths.upArrow} alt="back-to-top" />
      </StyledButton>
    </StyledDiv>
  );
};

export default BackToTop;
