import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const ItemMaster = () => {
  return (
    <CustomCard>
      <Header title="Item Master" />
      <CustomTabs />
    </CustomCard>
  );
};

export default ItemMaster;
