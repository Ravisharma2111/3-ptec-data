import { SecondarySelect } from "../../../../../components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allImgPaths from "../../../../../assets/images/allImgPaths";
import {
  Box,
  FormGroup,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Pagination,
  PaginationItem,
  Paper,
  Button,
  TextareaAutosize,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  outlinedInputClasses,
  styled,
} from "@mui/material";
import {
  CustomButton,
  CustomCheckBox,
  SearchBox,
} from "../../../../../components";
import { get, size } from "lodash";
// import allImgPaths from "../../../../assets/images/allImgPaths";
import {
  fetchCustomerList,
  fetchItemDetails,
  fetchSearchItems,
  postCreateOrderData,
  FetchCustomerReorder,
} from "../../../../../redux/actions/sales/order";
import useDebounce from "../../../../../hooks/useDebounce";

const SearchDataSource = "createSalesOrder";

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

const ViewCustomerReorder = () => {
  const dispatch = useDispatch();
  const { entitytypeaccess, allhierarchyflag = false } = useSelector(
    ({ auth }) => auth
  );
  const {
    customerList,
    isLoadingSearchItems,
    searchItems,
    itemInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerListData, setCustomerListData] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [recorderListData, setRecorderListData] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedValue, setSelectedValue] = useState("");

  const fetchDataFromApi = async () => {
    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        customerId: customerName,
      };
      const result = await dispatch(FetchCustomerReorder(payload));
      setRecorderListData(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };

  console.log("recorderListData", recorderListData);

  const getOptionsForCustomerType = () => {
    let options = [];
    Object.keys(entitytypeaccess).forEach((key) => {
      options.push({ label: entitytypeaccess[key], value: key });
    });
    return options;
  };
  const getOptionsForCustomerList = (list) => {
    let options = [];
    if (size(list)) {
      list.forEach(({ name, orgid }) => {
        options.push({ label: name, value: orgid });
      });
    }
    return options;
  };

  const getSearchItems = (payload) => {
    try {
      dispatch(fetchSearchItems(payload));
    } catch (error) {
      console.log("error getSearchItems=>", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      let payload = {};
      payload.searchDataSource = SearchDataSource;
      payload.searchText = debouncedSearchTerm;
      getSearchItems(payload);
    }
  }, [debouncedSearchTerm]);

  const getCustomersList = async (payload) => {
    try {
      const result = await dispatch(fetchCustomerList(payload));
      setCustomerListData(result);
    } catch (error) {
      console.log("error getCustomersList=>", error);
    }
  };

  useEffect(() => {
    if (customerType) {
      const payload = {
        childZoneFlag: true,
        selZoneIds: "",
        selCustomerTypes: customerType,
        allhierarchyflag,
      };
      getCustomersList(payload);
    }
  }, [customerType]);

  useEffect(() => {
    if (selectedItem) {
      let payload = {};
      payload.formAction = SearchDataSource;
      payload.itemCode = get(selectedItem, "value", "");
      dispatch(fetchItemDetails(payload));
    }
  }, [selectedItem]);

  const handleCreateOrder = () => {
    // Create the payload for the API request
    const payload = {
      invoiceData: JSON.stringify({
        userid: "59d35cfae4b0c1f361b0dd3b",
        orgid: "59d35cfae4b0c1f361b0dd37",
        orgname: "SS1",
        comments: "",
        miscellaneouscharges: {},
        additionaldiscounts: {},
        podetails: {},
        customertype: "distributor",
        customerid: "62318a53019c4b484247d67a",
        customername: "D7 Files",
        routeid: "",
        routename: "",
        type: "Invoice",
      }),
      apiToken: "5ce41b66efd611fbd95e70386a03ebf3",
      orderId: "630c6a7c01e1e835ec8333a6",
      txnSource: "Application",
      multiOrderInvoiceData: "",
      lineItemData: JSON.stringify([
        {
          customerid: "62318a53019c4b484247d67a",
          reference: "630c6a7c01e1e835ec8333a6",
          itemmasterrowkey: "6231b2ee019c4b484247d982",
          dmsitemid: "44000687-786a-4be5-94a3-54932d2c18bd",
          itemcode: "itema",
          itemname: "Item A",
          itemdescription: "Item A",
          itemskuflag: "false",
          iteminfoflag: "false",
          itemgroup: "Spare",
          pkgid: "5b471d1be4b0d2ee323f400d",
          pkgunit: "Pcs",
          pkgunitrate: "876",
          ratecategory: "ExclusiveAllTaxes",
          slno: "1",
          actqtypkgunits: "1000.00",
          billedqtypkgunits: "1000",
          taxamount: "157680",
          itemtaxfields: {
            "59d35c47e4b0c1f361b0d955": {
              taxpercent: "18",
              taxname: "GST@18%",
              taxpayableon: "SubTotal",
              taxcode: "3916",
            },
          },
          itemschemeflag: "false",
          itemdiscountpercent: "0.00",
          itemspldiscpercent: "0.00",
          orgid: "59d35cfae4b0c1f361b0dd37",
          tenantid: "59d3341fe4b0c1f361b0d64a",
          createdate: "1661758077764",
          createdby: "ss11@ss1.com",
          updatedate: "1661758077764",
          updatedby: "ss11@ss1.com",
          status: "Active",
          type: "Invoice",
          showPopUpFlag: "false",
          selectedRowId: "44000687-786a-4be5-94a3-54932d2c18bd_false_new",
          deliveredqtypkgunits: "0",
          freeqty: "0.0",
          billqtyamount: "876000.00",
          oldstockflag: "false",
        },
        {
          customerid: "62318a53019c4b484247d67a",
          reference: "630c6a7c01e1e835ec8333a6",
          itemmasterrowkey: "6231b2ee019c4b484247d981",
          dmsitemid: "ff9c240d-ee2e-4219-8af7-c0b269983722",
          itemcode: "itemb",
          itemname: "Item B",
          itemdescription: "Item B",
          itemskuflag: "false",
          iteminfoflag: "false",
          itemgroup: "Spare",
          pkgid: "5b471d1be4b0d2ee323f400d",
          pkgunit: "Pcs",
          pkgunitrate: "876",
          ratecategory: "ExclusiveAllTaxes",
          slno: "2",
          actqtypkgunits: "500.00",
          billedqtypkgunits: "500",
          taxamount: "78840",
          itemtaxfields: {
            "59d35c47e4b0c1f361b0d955": {
              taxpercent: "18",
              taxname: "GST@18%",
              taxpayableon: "SubTotal",
              taxcode: "3916",
            },
          },
          itemschemeflag: "false",
          itemdiscountpercent: "0.00",
          itemspldiscpercent: "0.00",
          orgid: "59d35cfae4b0c1f361b0dd37",
          tenantid: "59d3341fe4b0c1f361b0d64a",
          createdate: "1661758077764",
          createdby: "ss11@ss1.com",
          updatedate: "1661758077764",
          updatedby: "ss11@ss1.com",
          status: "Active",
          type: "Invoice",
          showPopUpFlag: "false",
          selectedRowId: "ff9c240d-ee2e-4219-8af7-c0b269983722_false_new",
          deliveredqtypkgunits: "0",
          freeqty: "0.0",
          billqtyamount: "438000.00",
          oldstockflag: "false",
        },
      ]),
    };

    // Dispatch the action to post data
    dispatch(postCreateOrderData(payload));
  };

  let totalBillingTransit = 0;
  let totalBillingTransitAmount = 0;

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    // Any additional logic you want to perform when the value changes
  };
  console.log("object", selectedValue);

  
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Customer Type"
          id="customer-type-select"
          options={getOptionsForCustomerType()}
          value={customerType}
          onChange={(e) => {
            setCustomerType(e.target.value);
            setCustomerName("");
            setIsSearchBoxVisible(false);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Customer Name"
          id="customer-name-select"
          value={customerName}
          onClick={fetchDataFromApi}
          options={getOptionsForCustomerList(customerList)}
          onChange={(e) => {
            setCustomerName(e.target.value);
            setIsSearchBoxVisible(true);
          }}
        />
      </Grid>
      {isSearchBoxVisible && (
        <>
          <Grid item xs={12} md={6}>
            <SearchBox
              hideIcon
              loading={isLoadingSearchItems}
              searchValue={searchTerm}
              optionValue={selectedItem}
              // open={isOpenSearchList}
              // onOpen={() => setIsOpenSearchList(true)}
              // onClose={() => setIsOpenSearchList(false)}
              onChange={(event, newValue) => {
                setSelectedItem(newValue);
              }}
              options={searchItems}
              onSearchChange={(event, newValue) => setSearchTerm(newValue)}
            />
          </Grid>
          {recorderListData?.length > 0 && (
            <Grid
              sx={{ padding: "15px 0px 0px 20px" }}
              container
              rowSpacing={"16px"}
            >
              <Grid item xs={12}>
                <Stack gap={1}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table
                      sx={{ minWidth: 650, borderRadius: 100 }}
                      aria-label="create-order-table"
                    >
                      <TableHead
                        sx={{
                          backgroundColor: "#D5E3F7",
                          padding: "20px 5px !important",
                        }}
                      >
                        <TableRow sx={{ padding: "20px 5px !important" }}>
                          <StyledTableHeaderCell>S. No.</StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Item Code
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Item name
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Description
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>HSN No</StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Pkg Unit
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            In Stock Qty
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Booked Qty
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            InTransit Qty
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Re-order Level
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Billing Qty(Stock Norm)
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Free Qty
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>Disc %</StyledTableHeaderCell>
                          <StyledTableHeaderCell>
                            Spl Disc %
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell>Rate </StyledTableHeaderCell>
                          <StyledTableHeaderCell>Amount </StyledTableHeaderCell>
                          <StyledTableHeaderCell>Action</StyledTableHeaderCell>
                        </TableRow>
                      </TableHead>
                      {recorderListData.map((listData, index) => {
                        const inTransitQty = listData?.inTransitQty ?? 0;
                        const billingTransit =
                          listData?.reorderlevel -
                          (listData?.instockqty + inTransitQty);
                        const totalAmount =
                          billingTransit * listData.oldpkgunitrate;
                        totalBillingTransit += billingTransit;
                        totalBillingTransitAmount += totalAmount;
                        return (
                          <TableBody>
                            <StyledTableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableBodyCell sx={{ textAlign: "center" }}>
                                {index + 1}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {listData.itemcode}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {listData.itemname}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {listData.itemdescription}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {
                                  listData.itemtaxfields[
                                    "59d35c47e4b0c1f361b0d955"
                                  ]?.taxcode
                                }
                              </StyledTableBodyCell>
                              <StyledTableBodyCell sx={{ minWidth: "120px" }}>
                                <SecondarySelect
                                  name={"packageUnit"}
                                  sx={SelectSx}
                                  id="packageUnit"
                                  hideLabel
                                  options={[
                                    {
                                      label: listData?.childpkgunit,
                                      value: listData?.childpkgunit,
                                    },
                                  ]}
                                  formLabelSx={{ lineHeight: "15px" }}
                                  label="Select"
                                  value={selectedValue}
                                  onChange={handleSelectChange}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"orderQty"}
                                  placeholder={"Qty"}
                                  value={Math.floor(listData.instockqty)}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"discPer"}
                                  placeholder={"Disc Per"}
                                  value={listData.bookedqty}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"splDisc"}
                                  placeholder={"Spe.Disc"}
                                  value={inTransitQty}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"rate"}
                                  placeholder={"Rate"}
                                  value={`${listData.reorderlevel}.00`}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {Math.floor(billingTransit)}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"splDisc"}
                                  placeholder={"Spe.Disc"}
                                  sx={{ textAlign: "center", color: "#274593" }}
                                  value={listData.damagedqty}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"rate"}
                                  placeholder={"Rate"}
                                  value={`${listData.moqqty}`}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"rate"}
                                  placeholder={"Rate"}
                                  value={`${listData.moqqty}`}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                sx={{ maxWidth: "100px", minWidth: "100px" }}
                              >
                                <CustomTextBox
                                  name={"rate"}
                                  placeholder={"Rate"}
                                  value={Math.floor(listData.oldpkgunitrate)}
                                />
                              </StyledTableBodyCell>
                              <StyledTableBodyCell>
                                {Math.floor(totalAmount)}
                              </StyledTableBodyCell>
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
                        );
                      })}
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={12}></Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#F9F9F9",
                    padding: "11px 15px",
                    mt: "16px",
                    borderRadius: "10px",
                  }}
                >
                  <Grid item xs={6} textAlign={"right"}>
                    <Typography
                      color="#274593"
                      fontWeight={"500"}
                      fontSize={"14px"}
                    >
                      Total Quantity: {Math.floor(totalBillingTransit)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} textAlign={"right"}>
                    <Typography
                      color="#274593"
                      fontWeight={"500"}
                      fontSize={"14px"}
                    >
                      Total Amount:{" "}
                      {`${Math.floor(totalBillingTransitAmount)}.00`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack gap={1}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table
                      sx={{ minWidth: 650, borderRadius: 100 }}
                      aria-label="create-order-table"
                    >
                      <TableHead
                        sx={{
                          backgroundColor: "#D5E3F7",
                          padding: "20px 5px !important",
                        }}
                      >
                        <TableRow sx={{ padding: "20px 5px !important" }}>
                          <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                            Tax Name
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                            Tax Percent
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                            Item Net Amount
                          </StyledTableHeaderCell>
                          <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                            Tax Amount
                          </StyledTableHeaderCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <StyledTableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableBodyCell
                            sx={{ textAlign: "center", color: "#274593" }}
                          >
                            GST@18%{" "}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            sx={{ textAlign: "center", color: "#274593" }}
                          >
                            {" "}
                            18%{" "}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            sx={{ textAlign: "center", color: "#274593" }}
                          >
                            {" "}
                            449100.00{" "}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            sx={{ textAlign: "center", color: "#274593" }}
                          >
                            {" "}
                            80838.00{" "}
                          </StyledTableBodyCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#F9F9F9",
                    padding: "11px 15px",
                    mt: "16px",
                    borderRadius: "10px",
                  }}
                >
                  <Grid item xs={11} textAlign={"right"}>
                    <Typography
                      color="#274593"
                      fontWeight={"500"}
                      fontSize={"14px"}
                    >
                      Total Tax Amount: 80838.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack overflow={"auto"} gap={"10px"}>
                  <Typography> Add Comments</Typography>
                  <TextareaAutosize
                    className="comment-textarea"
                    name={"comment"}
                    type={"text"}
                    placeholder={"write here"}
                    minRows={4}
                  />
                </Stack>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sx={{
                  backgroundColor: "#5CB75C",
                  padding: "11px 15px",
                  mt: "16px",
                  borderRadius: "10px",
                }}
              >
                <Grid item xs={11} textAlignc={"right"}>
                  <Typography
                    color="#FFFFFF"
                    display={"flex"}
                    fontWeight={"500"}
                    fontSize={"16px"}
                  >
                    Net Billing Amount: {80838.0 + 449100.0}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Stack>
                  <CustomButton
                    // onClick={handleCreateOrder}
                    label="Create Re-Order"
                    sx={{
                      textTransform: "capitalize",
                      maxWidth: "290px",
                      borderRadius: "38px",
                      padding: "16px 49px",
                      height: "51px",
                      fontSize: "18px",
                    }}
                  />
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "18px",
                      mt: 1,
                    }}
                    size="small"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default ViewCustomerReorder;
