import React from "react";
import { CustomCard, Header } from "../../../components";
import CustomTabs from "./Tabs";

const Item = () => {
  return (
    <CustomCard>
      <Header title="Item Mapping" />
      <CustomTabs />
    </CustomCard>
  );
};

export default Item;
