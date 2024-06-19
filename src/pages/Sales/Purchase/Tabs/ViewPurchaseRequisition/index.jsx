import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, size } from "lodash";
import allImgPaths from "../../../../../assets/images/allImgPaths";
import {
  fetchOrderList,
  fetchDataOrderId,
  fetchCustomerList,
  FetchPrintInvoiceData,
  fetchSearchItems,
  fetchItemDetails,
  fetchSearchData
} from "../../../../../redux/actions/sales/order";
import useDebounce from "../../../../../hooks/useDebounce";

import {
  Box,
  Grid,
  Pagination,
  TextField,
  PaginationItem,
  Paper,
  Button,
  TextareaAutosize,
  Stack,
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  PrimarySelect,
  CustomButton,
  SearchInput,
  SecondarySelect,
  SearchBox,
} from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";

const SearchDataSource = "createSalesOrder";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  justifyContent: "center",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ...sx,
}));
const StyledTableBodyCell = styled(TableCell)(({ theme, sx }) => ({
  justifyContent: "center",
  textAlign: "center",
  ...sx,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F0F0F0",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9F9F9",
  },
}));

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

const ViewPurchaseRequisition = () => {
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
  console.log("searchItems", searchItems);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [customerNames, setCustomerNames] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [orderDataId, setOrderDataId] = useState();
  const [viewOrderStatus, setViewOrderStatus] = useState("OpenOrPending");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const items = localStorage.getItem("apiToken");
  const [customerListData, setCustomerListData] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [printInvoice, setPrintInvoice] = useState([]);
  const [showPrintInvoice, setShowPrintInvoice] = useState(false);
  const [invoiceDataPrint, setInvoiceDataPrint] = useState("");
  const [showInvoiceAgainistOrder, setShowInvoiceAgainistOrder] =   useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const [searchDMSData, setSearchDMSData] = useState([]);


  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          startIndex: (currentPage - 1) * itemsPerPage,
          recordLimit: itemsPerPage.toString(),
          drawPageNo: currentPage.toString(),
          searchText,
          searchRegexFlag: "false",
          entityId: "59d35cfae4b0c1f361b0dd37",
          customerId: selectedCustomer || "All",
          status: viewOrderStatus,
        };
        const result = await dispatch(fetchOrderList(payload));
        setOrderData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    fetchDataFromApi();
  }, [viewOrderStatus, itemsPerPage, searchText, items]);


  useEffect(() => {
    const fetchSearchDMSData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          searchDataSource: 'createSalesOrder',
          searchText: "item",
        };
        const result = await dispatch(fetchOrderList(payload));
        setSearchDMSData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    fetchSearchDMSData();
  }, [searchDMSData]);





  const fetchDataForInvoicePrint = async () => {
    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        failedTxnFlag: false,
        invoiceId: "616934953cf662413e0158ef",
      };
      const result = await dispatch(FetchPrintInvoiceData(payload));
      setPrintInvoice(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };

  console.log("printInvoice,", printInvoice);

  const handleCustomerChange = (event) => {
    const selectedCustomer = event.target.value;
    console.log("selectedCustomer", selectedCustomer);
    setSelectedCustomer(selectedCustomer);
    setCurrentPage(1);
  };

  const handleOrderNumberId = async (dataId) => {
    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
      };
      const result = await dispatch(fetchDataOrderId(dataId, payload));
      setOrderDataId(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
    setShowInvoiceAgainistOrder(true);
    setShowPrintInvoice(false);
  };

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchText(term);
  };

  const filteredStocks = orderData?.data?.filter((stock) => {
    const matchesCustomer =
      !selectedCustomer || stock?.orgid == selectedCustomer;
    console.log("matchesCustomer", matchesCustomer);
    const matchesSearch = stock?.customername
      .toLowerCase()
      .includes(searchText.toLowerCase());
    console.log("matchesSearch", matchesSearch);

    return matchesCustomer && matchesSearch;
  });

  const totalEntries = orderData?.recordsTotal;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderData = orderData?.result?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleInvoicePrint = (data) => {
    fetchDataForInvoicePrint();
    setShowPrintInvoice(true);
    setInvoiceDataPrint(data);
    setShowInvoiceAgainistOrder(false);
  };

  const handlePrintingInvoice = () => {
    window.print();
  };

  console.log("invoiceDataPrint", invoiceDataPrint);
  console.log("orderData", orderData);
  console.log("customerListData", customerListData);
  console.log("orderDataId", orderDataId);

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

  const getOptionsForCustomerList = (list) => {
    console.log("list listlist", list);
    let options = [];
    if (size(list)) {
      list.forEach(({ name, orgid }) => {
        options.push({ label: name, value: orgid });
      });
    }
    return options;
  };

  const getCustomersList = async (payload) => {
    try {
      const result = await dispatch(fetchCustomerList(payload));
      setCustomerListData(result);
    } catch (error) {
      console.log("error getCustomersList", error);
    }
  };
  useEffect(() => {
    getCustomersList({
      childZoneFlag: true,
      selZoneIds: "",
      selCustomerTypes: "",
      allhierarchyflag,
    });
  }, []);

  useEffect(() => {
    const payload = {
      childZoneFlag: true,
      selZoneIds: "",
      selCustomerTypes: "",
      allhierarchyflag,
    };
    getCustomersList(payload);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      let payload = {};
      payload.formAction = SearchDataSource;
      payload.itemCode = get(selectedItem, "value", "");
      dispatch(fetchItemDetails(payload));
    }
  }, [selectedItem]);

  const invoiceData = orderDataId?.lineitem[0];

  const ViewOrderTable = () => {
    const startIndexs = (currentPage - 1) * itemsPerPage;

    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{ minWidth: 650, borderRadius: 100 }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                backgroundColor: "#D5E3F7",
                padding: "20px 5px !important",
              }}
            >
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell>S.No.</StyledTableHeaderCell>
                <StyledTableHeaderCell>Customer name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Order Number</StyledTableHeaderCell>
                <StyledTableHeaderCell>Route Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Order date</StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                <StyledTableHeaderCell>Details</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {filteredStocks && filteredStocks.length > 0 ? (
            <TableBody>
              {filteredStocks?.map((data, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableBodyCell>
                    {startIndexs + index + 1}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>{data.customername}</StyledTableBodyCell>
                  <Button onClick={() => handleOrderNumberId(data?._id?.$oid)}>
                    {data.orderno}
                  </Button>
                  <StyledTableBodyCell>{data.routename}</StyledTableBodyCell>
                  <Button onClick={() => handleInvoicePrint(data)}>
                    {" "}
                    {data.orderdate}{" "}
                  </Button>
                  <StyledTableBodyCell>{data.orderdate}</StyledTableBodyCell>
                  <StyledTableBodyCell>{data.status}</StyledTableBodyCell>
                  <StyledTableBodyCell>{data.details}</StyledTableBodyCell>
                </StyledTableRow>
              ))}
            </TableBody>
            )  : (
        <TableBody>
          <StyledTableRow>
            <StyledTableBodyCell colSpan={7} align="center">
              No data found in table
            </StyledTableBodyCell>
          </StyledTableRow>
        </TableBody>
      )}
          </Table>
        </TableContainer>
        {filteredStocks && filteredStocks.length > 0 && (
          <>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography whiteSpace={"nowrap"}>
            Showing {startIndex} to {endIndex} of {totalEntries} entries &nbsp;
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Pagination
            sx={{
              backgroundColor: "#FFF",
              "& .Mui-selected": {
                backgroundColor: "#FFF !important",
                borderRadius: "5px",
                boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
              },
            }}
            hideNextButton
            hidePrevButton
            shape="rounded"
            count={Math.ceil(orderData?.recordsTotal / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
          />
        </Stack>
        </> )}
      </Stack>
    );
  };
  const ViewPrintInvoice = () => {
    const startIndexs = (currentPage - 1) * itemsPerPage;
    const tableStyle = {
      display: "flex",
      flexDirection: "column",
      borderCollapse: "collapse",
      width: "500px", // Adjust the width as needed
      margin: "auto", // Center the table horizontally
    };

    const cellStyle = {
      border: "1px solid #ddd",
      padding: "8px",
      width: "300px",
      textAlign: "left",
    };
    console.log("invoiceDataPrint121", invoiceDataPrint);
    return (
      <Stack gap={1}>
        <Grid item xs={12} md={6}>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={cellStyle}>Label 1</th>
                <td style={cellStyle}>Data 1</td>
              </tr>
              <tr>
                <th style={cellStyle}>Label 2</th>
                <td style={cellStyle}>Data 2</td>
              </tr>
            </tbody>
          </table>

          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={cellStyle}>Label 1</th>
                <td style={cellStyle}>Data 1</td>
              </tr>
              <tr>
                <th style={cellStyle}>Label 2</th>
                <td style={cellStyle}>Data 2</td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography whiteSpace={"nowrap"}>
            Showing {startIndex} to {endIndex} of {totalEntries} entries &nbsp;
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Pagination
            sx={{
              backgroundColor: "#FFF",
              "& .Mui-selected": {
                backgroundColor: "#FFF !important",
                borderRadius: "5px",
                boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
              },
            }}
            hideNextButton
            hidePrevButton
            shape="rounded"
            count={Math.ceil(orderData?.recordsTotal / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
          />
        </Stack>
        <Grid item xs={12} md={6}>
          <Button onClick={handlePrintingInvoice}>Print Invoice</Button>
        </Grid>
      </Stack>
    );
  };
  const ViewInvoiceAgainOrder = () => {
    return (
      <Stack gap={1}>
        <Button variant="contained" width="200px">
          {" "}
          create Invoice Against Order
        </Button>
        <Stack display={"contents"} direction={"row"} alignItems={"flex-start"}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              {" "}
              Sold To : D1 &nbsp;
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              {" "}
              Order Date : 21/12/2023 14:31:4 &nbsp;
            </Typography>
          </Grid>
          <Typography variant="h6" component="h6">
            {" "}
            Order No : dms-order-84 &nbsp;
          </Typography>
        </Stack>
        <Grid item xs={12}>
          <Typography mb={"10px"}>Search </Typography>
          <Stack gap={"16px"} direction={"row"} alignItems={"center"}>
            <SearchBox
              hideIcon
              loading={isLoadingSearchItems}
              searchValue={searchTerm}
              optionValue={selectedItem}
              open={isOpenSearchList}
              onOpen={() => setIsOpenSearchList(true)}
              onClose={() => setIsOpenSearchList(false)}
              onChange={(event, newValue) => {
                setSelectedItem(newValue);
              }}
              options={searchItems}
              onSearchChange={(event, newValue) => setSearchTerm(newValue)}
            />
          </Stack>
        </Grid>
        {
  (
    <Grid container rowSpacing={"16px"}>
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
                  <StyledTableHeaderCell>Item Code</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Item name</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                  <StyledTableHeaderCell>HSN No</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Pkg Unit</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Order Qty</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Delivered Qty</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Billing Qty</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Free Qty</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Disc %</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Spl Disc</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Rate</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Amount</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Action</StyledTableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableBodyCell sx={{ textAlign: "center" }}>
                    1
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {invoiceData?.itemcode}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {invoiceData?.itemname}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {invoiceData?.itemdescription}
                  </StyledTableBodyCell>
                  <StyledTableHeaderCell>
                    {
                      invoiceData?.itemtaxfields["59d35c47e4b0c1f361b0d955"]
                        .taxcode
                    }
                  </StyledTableHeaderCell>
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
                  <StyledTableBodyCell>
                    {invoiceData?.actqtypkgunits}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {invoiceData?.billedqtypkgunits}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    sx={{ maxWidth: "100px", minWidth: "100px" }}
                  >
                    <CustomTextBox
                      name={"splDisc"}
                      placeholder={"Spe.Disc"}
                      value={invoiceData?.actqtypkgunits}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    sx={{ maxWidth: "100px", minWidth: "100px" }}
                  >
                    <CustomTextBox
                      name={"rate"}
                      placeholder={"Rate"}
                      value={`${invoiceData?.itemspldiscpercent}.0`}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    sx={{ maxWidth: "100px", minWidth: "100px" }}
                  >
                    <CustomTextBox
                      name={"rate"}
                      placeholder={"Rate"}
                      value={`${invoiceData?.itemdiscountpercent}.0`}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    sx={{ maxWidth: "100px", minWidth: "100px" }}
                  >
                    <CustomTextBox
                      name={"rate"}
                      placeholder={"Rate"}
                      value={`${invoiceData?.itemdiscountpercent}.0`}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    sx={{ maxWidth: "100px", minWidth: "100px" }}
                  >
                    <CustomTextBox
                      name={"rate"}
                      placeholder={"Rate"}
                      value={`${invoiceData?.pkgunitrate}`}
                    />
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {invoiceData?.actqtyamount}
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
              <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
                Total Quantity: 876.00
                {/* {Math.floor(totalBillingTransit)} */}
              </Typography>
            </Grid>
            <Grid item xs={5} textAlign={"right"}>
              <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
                Total Amount: 876.00
                {/* {`${Math.floor(totalBillingTransitAmount)}.00`} */}
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
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
              sx={{ textTransform: "capitalize", fontSize: "18px", mt: 1 }}
              size="small"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
        </Grid>
        )}
      </Stack>
    );
  };

  return (
    <>
      {showPrintInvoice ? (
        <ViewPrintInvoice />
      ) : showInvoiceAgainistOrder && orderDataId ? (
        <ViewInvoiceAgainOrder />
      ) : (
        <>
          <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
            <Grid item xs={12} md={6}>
              <SecondarySelect
                label="Customer Name"
                id="customer-name-select"
                value={selectedCustomer}
                options={getOptionsForCustomerList(customerListData)}
                onChange={handleCustomerChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SecondarySelect
                label="Select Type"
                id="status-select-1"
                value={viewOrderStatus}
                options={[
                  { label: "OpenOrPending", value: "OpenOrPending" },
                  { label: "Open", value: "Open" },
                  { label: "Pending", value: "Pending" },
                  { label: "Closed", value: "Closed" },
                  { label: "Failed", value: "Failed" },
                ]}
                onChange={(e) => setViewOrderStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SearchInput onSearch={handleSearch} />
            </Grid>
            <Stack  sx={{ padding: "13px 0px 2px 26px" }} direction={"row"} alignItems={"center"}>
              <Typography whiteSpace={"nowrap"}>
                Items per page:&nbsp;
              </Typography>
              <PrimarySelect
                options={ItemPerPage}
                name={"items-per-page"}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                sx={{
                  backgroundColor: "transaprent",
                  borderColor: "#CACACA",
                  color: "#121212",
                  [`& .${outlinedInputClasses.notchedOutline}`]: {
                    border: "1px solid #CACACA",
                  },
                  ".MuiSvgIcon-root ": {
                    color: "#848484",
                  },
                }}
                fullWidth={false}
              />
            </Stack>
            {orderDataId ? (
        <ViewInvoiceAgainOrder />
      ) : (
        <Grid item xs={12}>
          <ViewOrderTable />
        </Grid>
      )}
          </Grid>
        </>
      )}
    </>
  );
};

export default ViewPurchaseRequisition;
