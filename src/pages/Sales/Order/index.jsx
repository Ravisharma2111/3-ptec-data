import React, { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { size } from "lodash";
import { useSelector } from "react-redux";
import { CustomCard } from "../../../components";
import { CreateOrderBody, CustomTabs } from "./components";

const OrderManagement = () => {
  const [value, setValue] = useState(0);
  const { isLoadingItemInfo, itemInfo } = useSelector(({ order }) => order);
console.log('object',itemInfo)
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const Header = () => {
    return (
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h4" fontSize={"28px"} fontWeight={"bold"}>
          Order Management
        </Typography>
      </Stack>
    );
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Stack gap={"36px"}>
            <CustomCard>
              <Header />
              <CustomTabs value={value} onChange={handleTabChange} />
            </CustomCard>
            {value === 1 && size(itemInfo) > 0 && (
              <CustomCard>
                <CreateOrderBody itemInfo={itemInfo} />
              </CustomCard>
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderManagement;
