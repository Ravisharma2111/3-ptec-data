import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Stock = () => {
  return (
    <CustomCard>
      <Header title="Stock  Management" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Stock;
