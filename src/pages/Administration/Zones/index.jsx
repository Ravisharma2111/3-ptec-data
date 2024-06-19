import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Connector = () => {
  return (
    <CustomCard>
      <Header title="Zones" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Connector;
