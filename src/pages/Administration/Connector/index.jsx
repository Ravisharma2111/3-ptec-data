import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Connector = () => {
  return (
    <CustomCard>
      <Header title="Connector" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Connector;
