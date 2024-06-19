import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import ViewOrder from "./ViewOrder";
import CreateOrder from "./CreateOrder";

const TabSx = { padding: "0px 15px", height: "21px", textTransform: "capitalize" };
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`custom-tabpanel-${index}`} aria-labelledby={`custom-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allProps(index) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

const CustomTabs = ({ value, onChange = () => {} }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={onChange}
          sx={{
            "& .Mui-selected": { color: "#0176D3", fontWeight: "700" },
            "& button": {
              letterSpacing: "0.36px",
              height: "30px !important",
              fontSize: "18px",
              lineHeight: 1,
            },
            "& .MuiTabs-scroller": {
              height: "43px",
            },
          }}
          variant={"scrollable"}
          scrollButtons={false}
          TabIndicatorProps={{ sx: { height: "4px", borderRadius: "15px 15px 0px 0px", backgroundColor: "#274593" } }}
        >
          <Tab sx={TabSx} label="View Order" {...allProps(0)} />
          <Tab sx={TabSx} label="Create Order" {...allProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ViewOrder />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CreateOrder />
      </CustomTabPanel>
    </Box>
  );
};

export default CustomTabs;
