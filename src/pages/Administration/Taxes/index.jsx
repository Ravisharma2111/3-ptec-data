import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Taxes = () => {
  return (
    <CustomCard>
      <Header title="Taxes" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Taxes;
