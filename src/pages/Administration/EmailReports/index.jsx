import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const EmailReports = () => {
  return (
    <CustomCard>
      <Header title="Email Reports" />
      <CustomTabs />
    </CustomCard>
  );
};

export default EmailReports;
