import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import ViewCustomerReorder from "./ViewCustomerReorder";
import ViewFailedTransaction from "./ViewFailedTransaction";
import ViewInvoice from "./ViewInvoice";
import CreateInvoice from "./CreateInvoice";

const TabSx = { padding: "0px 15px", height: "21px", textTransform: "capitalize" };
const TabsList = ["View Customer Reorder", "View Failed Transaction", "View Invoice", "Create Invoice"];
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
          TabIndicatorProps={{ sx: { height: "4px", borderRadius: "15px 15px 0px 0px", backgroundColor: "#274593" } }}
          variant={"scrollable"}
          scrollButtons={false}
        >
          {TabsList.map((tab, index) => (
            <Tab key={index} sx={TabSx} label={tab} {...allProps(index)} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ViewCustomerReorder />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ViewFailedTransaction />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ViewInvoice />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CreateInvoice />
      </CustomTabPanel>
    </Box>
  );
};

export default CustomTabs;
