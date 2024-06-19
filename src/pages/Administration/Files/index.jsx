import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Files = () => {
  return (
    <CustomCard>
      <Header title="Files" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Files;
