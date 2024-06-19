import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Users = () => {
  return (
    <CustomCard>
      <Header title="Users" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Users;
