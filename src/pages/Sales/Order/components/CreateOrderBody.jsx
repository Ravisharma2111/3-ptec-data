import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
  outlinedInputClasses,
  styled,
} from "@mui/material";
import {useDispatch, useSelector } from "react-redux";
import { size } from "lodash";
import allImgPaths from "../../../../assets/images/allImgPaths";
import { CustomButton, SecondarySelect } from "../../../../components";
import { postCreateOrderData } from "../../../../redux/actions/sales/order";
import "../styles/createOrderBody.css";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "left",
  paddingLeft: "8px",
  paddingRight: "8px",
  whiteSpace: "nowrap",
  fontWeight: "500",
  ...sx,
}));

const StyledTableBodyCell = styled(TableCell)(({ theme, sx }) => ({
  textAlign: "left",
  paddingLeft: "8px",
  paddingRight: "8px",
  ...sx,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // padding:"15px 10px",
  "&:nth-of-type(even)": {
    backgroundColor: "#F0F0F0",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9F9F9",
  },
}));

const PackageUnitOptions = [
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "40",
    value: 40,
  },
];

const SelectSx = {
  fontSize: "12px",
  height: "30px",
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "1px solid #BDBDBD",
    borderRadius: "5px",
  },
  ".MuiSvgIcon-root": {
    fontSize: "22px",
    right: 0,
  },
};

const CustomTextBox = ({ placeholder, value, name }) => {
  return (
    <TextField
      fullWidth
      name={name}
      sx={{
        backgroundColor: "#F0F0F0",
        borderRadius: "10px",
        "& .MuiOutlinedInput-input": {
          zIndex: 1,
        },
        [`& .${outlinedInputClasses.root}`]: {
          height: "30px",
        },
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          border: "1px solid #BDBDBD",
          borderRadius: "5px",
          backgroundColor: "#F0F0F0",
        },
      }}
      value={value}
      placeholder={placeholder}
    />
  );
};


const CreateOrderBody = ({ itemInfo }) => {
  console.log('itemInfo',itemInfo)
  const dispatch = useDispatch();
  const { isLoadingItemInfo } = useSelector(({ order }) => order);
  const [customerCreateData, setCustomerCreateData] = useState([]);
  function createData(sNo, itemCode, itemName, description, hSNNo, pkgUnit, orderQty, discPer, splDisc, rate, amount) {
    return { sNo, itemCode, itemName, description, hSNNo, pkgUnit, orderQty, discPer, splDisc, rate, amount };
  }

  const items = localStorage.getItem('apiToken');
  const handleCreateOrder = async () => {
    const payload = {
      apiToken: items,
      txnSource: "Application",
      failedOrderFlag: "false",
    };
  
    const strRequestBodyData = {
      "orderData": {
        "customertype": "distributor",
        "customerid": "59ef0004e4b0e7f8ee5970d3",
        "customername": "Cust on 29 Aug",
        "routeid": "",
        "routename": "",
        "comments": "",
        "userid": "59d35cfae4b0c1f361b0dd3b",
        "orgid": "59d35cfae4b0c1f361b0dd37",
        "orgname": "SS1",
        "type": "SalesOrder",
        "miscellaneouscharges": {},
      },
      "lineItemData": [
        {
          "orgid": "59d35cfae4b0c1f361b0dd37",
          "reorderlevel": "0",
          "moqqty": "0",
          "itemmasterrowkey": "6231b2ee019c4b484247d981",
          "itemschemeflag": "false",
          "itemname": "Item B",
          "itemdescription": "Item B",
          "itemgroup": "Spare",
          "pkgunitrate": "876",
          "ratecategory": "ExclusiveAllTaxes",
          "iteminfoflag": "false",
          "customerprice": {},
          "customermargin": {},
          "uniqueitemkey": "itemb_false_pcs_pcs",
          "txnstatus": "Saleable",
          "dmsitemid": "ff9c240d-ee2e-4219-8af7-c0b269983722",
          "itemcode": "itemb",
          "itemskuflag": "false",
          "pkgid": "5b471d1be4b0d2ee323f400d",
          "basepkgflag": "true",
          "pkgunit": "Pcs",
          "tenantid": "59d3341fe4b0c1f361b0d64a",
          "type": "SalesOrder",
          "showPopUpFlag": "false",
          "customerid": "59d35d2ee4b0c1f361b0dfa6",
          "slno": "1",
          "actqtypkgunits": "1",
          "actqtyamount": "876",
          "itemdiscountpercent": "0",
          "itemspldiscpercent": "0",
        },
      ],
    };
    try {
      const result = await dispatch(postCreateOrderData({strRequestBodyData, payload}));
      setCustomerCreateData(result)   
    console.log('Data returned by the API:', result);
  } catch (error) {
    console.error("Error fetching OrderList:", error);
  }
}
console.log('setCustomerCreateData',customerCreateData)

const taxPercent = itemInfo?.itemtaxfields?.['59d35c47e4b0c1f361b0d955']?.taxpercent ?? 0;

  const calculatedValue = (taxPercent / 100) * itemInfo.oldpkgunitrate;
  const ItemInfoTable = () => {
    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="create-order-table">
            <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell>S. No.</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Code</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell>HSN No</StyledTableHeaderCell>
                <StyledTableHeaderCell>Pkg Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>Order Qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Disc %</StyledTableHeaderCell>
                <StyledTableHeaderCell>Spl Disc</StyledTableHeaderCell>
                <StyledTableHeaderCell>Rate</StyledTableHeaderCell>
                <StyledTableHeaderCell>Amount</StyledTableHeaderCell>
                <StyledTableHeaderCell>Action</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <StyledTableBodyCell sx={{ textAlign: "center" }}>1</StyledTableBodyCell>
                  <StyledTableBodyCell>{itemInfo.itemcode}</StyledTableBodyCell>
                  <StyledTableBodyCell>{itemInfo.itemname}</StyledTableBodyCell>
                  <StyledTableBodyCell>{itemInfo.itemdescription}</StyledTableBodyCell>
                  <StyledTableBodyCell>{itemInfo.itemtaxfields['59d35c47e4b0c1f361b0d955']?.taxcode}</StyledTableBodyCell>
                  <StyledTableBodyCell sx={{ minWidth: "120px" }}>
                    <SecondarySelect
                      name={"packageUnit"}
                      sx={SelectSx}
                      id="packageUnit"
                      hideLabel
                      options={PackageUnitOptions}
                      formLabelSx={{ lineHeight: "15px" }}
                      label="Select"
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell sx={{ maxWidth: "100px", minWidth: "100px" }}>
                    <CustomTextBox name={"orderQty"} placeholder={"Qty"} value={itemInfo.childpkgqty} />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell sx={{ maxWidth: "100px", minWidth: "100px" }}>
                    <CustomTextBox name={"discPer"} placeholder={"Disc Per"} value={itemInfo.reorderlevel} />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell sx={{ maxWidth: "100px", minWidth: "100px" }}>
                    <CustomTextBox name={"splDisc"} placeholder={"Spe.Disc"} value={itemInfo.moqqty} />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell sx={{ maxWidth: "100px", minWidth: "100px" }}>
                    <CustomTextBox name={"rate"} placeholder={"Rate"} value={`${itemInfo.oldpkgunitrate}.00`} />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>{itemInfo.oldpkgunitrate}</StyledTableBodyCell>
                  <StyledTableBodyCell>
                    <Box display={"flex"} justifyContent={"center"}>
                      <img
                        src={allImgPaths.trash}
                        alt="trash"
                        style={{
                          display: "flex",
                          width: "30px",
                          height: "30px",
                          padding: "4px 5px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "34px",
                          background: "#F7D5D5",
                          gap: "10px",
                          flexShrink: "0",
                        }}
                      />
                    </Box>
                  </StyledTableBodyCell>
                </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  const ItemTaxTable = () => {
   
    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="create-order-table">
            <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>Tax Name</StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>Tax Percent</StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>Item Net Amount</StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>Tax Amount</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableBodyCell sx={{ textAlign: "center", color: "#274593" }}>{itemInfo.itemtaxfields['59d35c47e4b0c1f361b0d955']?.taxname}</StyledTableBodyCell>
                <StyledTableBodyCell sx={{ textAlign: "center", color: "#274593" }}>{itemInfo.itemtaxfields['59d35c47e4b0c1f361b0d955']?.taxpercent}%</StyledTableBodyCell>
                <StyledTableBodyCell sx={{ textAlign: "center", color: "#274593" }}>{`${itemInfo.oldpkgunitrate}.00`}</StyledTableBodyCell>
                <StyledTableBodyCell sx={{ textAlign: "center", color: "#274593" }}>{calculatedValue}</StyledTableBodyCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  return isLoadingItemInfo ? (
    <CircularProgress />
  ) : (
    size(itemInfo) > 0 && (
      <Grid container rowSpacing={"16px"}>
        <Grid item xs={12}>
          <ItemInfoTable />
        </Grid>
        <Grid container item xs={12} sx={{ backgroundColor: "#F9F9F9", padding: "11px 15px", mt: "16px", borderRadius: "10px" }}>
          <Grid item xs={6} textAlign={"right"}>
            <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
              Total Quantity: {itemInfo.childpkgqty}
            </Typography>
          </Grid>
          <Grid item xs={5} textAlign={"right"}>
            <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
              Total Amount: {`${itemInfo.oldpkgunitrate}.00`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ItemTaxTable />
        </Grid>
        <Grid container item xs={12} sx={{ backgroundColor: "#F9F9F9", padding: "11px 15px", mt: "16px", borderRadius: "10px" }}>
          <Grid item xs={11} textAlign={"right"}>
            <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
              Total Tax Amount: {calculatedValue}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack overflow={"auto"} gap={"10px"}>
            <Typography> Add Comments</Typography>
            <TextareaAutosize className="comment-textarea" name={"comment"} type={"text"} placeholder={"write here"} minRows={4} />
          </Stack>
        </Grid>
        <Grid container item xs={12} sx={{ backgroundColor: "#5CB75C", padding: "11px 15px", mt: "16px", borderRadius: "10px" }}>
          <Grid item xs={11} textAlignc={"right"}>
            <Typography color="#FFFFFF" fontWeight={"500"} fontSize={"16px"}>
              Net Billing Amount:{calculatedValue + itemInfo.oldpkgunitrate}.00
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Stack>
            <CustomButton
            onClick={handleCreateOrder}
              label="Create Order"
              sx={{ textTransform: "capitalize", maxWidth: "220px", borderRadius: "38px", padding: "16px 49px", height: "51px", fontSize: "18px" }}
            />
            <Button sx={{ textTransform: "capitalize", fontSize: "18px", mt: 1 }} size="small">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    )
  );
};

export default CreateOrderBody;
