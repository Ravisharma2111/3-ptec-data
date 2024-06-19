import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const OrgStructure = () => {
  return (
    <CustomCard>
      <Header title="Org Structure" />
      <CustomTabs />
    </CustomCard>
  );
};

export default OrgStructure;
