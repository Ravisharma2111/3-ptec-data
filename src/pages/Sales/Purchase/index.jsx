import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Purchase = () => {
  return (
    <CustomCard>
      <Header title="Purchase  Management" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Purchase;
