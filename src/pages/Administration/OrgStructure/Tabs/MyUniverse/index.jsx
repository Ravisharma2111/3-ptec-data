import React, { useState, useEffect, useRef } from "react";
import { CSVLink } from "react-csv";
import {
  Grid,
  Pagination,
  Box,
  Button,
  PaginationItem,
  AccordionSummary,
  Container,
  Accordion,
  AccordionDetails,
  IconButton,
  Paper,
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
import LayoutFlow from "./Flow";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAdminUniverse,
  handleHierarchyLevelService,
  FetchAllStocksService,
  handleFetchChildEntity,
  handleFetchReportItem,
  handleFetchReportItemGroup,
  handleFetchCustomerList,
} from "../../../../../redux/actions/sales/order";
import {
  CustomButton,
  CustomCheckBox,
  SecondarySelect,
  TextBox,
  PrimarySelect,
  SearchInput,
} from "../../../../../components";
import allImgPaths from "../../../../../assets/images/allImgPaths";
import { ItemPerPage } from "../../../../../shared/constants";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "center",
  ...sx,
}));
const StyledTableBodyCell = styled(TableCell)(({ theme, sx }) => ({
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
const buttonSx = {
  "& .MuiOutlinedInput-input": {
    zIndex: 1,
  },
  [`& .${outlinedInputClasses.root}`]: {
    height: "46px",
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#F0F0F0",
  },
};

const MyUniverse = () => {
  const isInitialRender = useRef(true);
  const { entitytypeaccess, allhierarchyflag = false } = useSelector(
    ({ auth }) => auth
  );

  const {
    customerList,
    isLoadingOrderInfo,
    searchItems,
    orderInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const dispatch = useDispatch();
  // const isInitialRender = useRef(true);
  const [universeData, setUniverseData] = useState([]);
  const [hierarchyLeveldata, setHierarchyLevelData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orgLevel, setOrgLevel] = useState("Active");
  const [showHierarchyLevel, setShowHierarchyLevel] = useState(false);
  const items = localStorage.getItem("apiToken");
  const [searchText, setSearchText] = useState("");
  const [showEditData, setShowEditData] = useState(false);
  const [allStocksService, setAllStocksService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockCustomerType, setStockCustomerType] = useState("Saleable");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("layoutFlow");
  const [allReportItem, setAllReportItem] = useState([]);
  const [allReportGroup, setAllReportGroup] = useState([]);
  const [editCustomerdata, seEditCustomerData] = useState([]);
  const [allChildEntity, setAllChildEntity] = useState([]);
  const [formData, setFormData] = useState({
    customerData: {
      name: "",
      orggroup: "",
      reordertype: "",
      orgstockflag: "",
      status: "",
    },
    addressData: {
      _id: { $oid: "" },
      address1: "",
      address2: "",
      country: "",
      state: " ",
      district: "",
      city: "",
      stategstcode: "",
      zipcode: "",
      contactno: "",
      emailid: "",
      fax: "",
      otherinfo1: "",
      otherinfo2: "",
      otherinfo3: "",
      addresstype: "",
      status: "",
    },
  });
  

  const position = { x: 0, y: 0 };

  const handleNumberCountData = async (info) => {
    const id = info?.id;
    const typesData = info?.type;

    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        orgType: typesData,
        orgTxnFlag: true,
        hierarchyGroupId: id,
        status: orgLevel,
      };
      const result = await dispatch(handleHierarchyLevelService(payload));
      setHierarchyLevelData(result);
      setCurrentView("OrgHierarchyLevel");
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  const handleOpenStockData = async (org) => {
    const orgDataId = org[2]?._id?.$oid;
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
        stockStatus: stockCustomerType,
        entityId: orgDataId,
      };
      console.log("paylaod", payload);

      const result = await dispatch(FetchAllStocksService(payload));
      setAllStocksService(result);
      setCurrentView("OrgViewStockTable");
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  const handleOpenReportItem = async () => {
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
      };
      const result = await dispatch(handleFetchReportItem(payload));
      const reportResult = await dispatch(handleFetchReportItemGroup(payload));
      const childEntity = await dispatch(handleFetchChildEntity(payload));
      setAllReportItem(result);
      setAllReportGroup(reportResult);
      setAllChildEntity(childEntity);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  console.log("allReportItem", allReportItem);
  console.log("allReportGroup", allReportGroup);
  console.log("allChildEntity", allChildEntity);
  console.log("allStocksService universe", allStocksService);


  const handleEditUserData = async (org) => {
    const editDataId = org[2]?._id?.$oid;
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
      };
      const result = await dispatch(
        handleFetchCustomerList(payload, editDataId)
      );
      seEditCustomerData(result);
      setShowEditData(true);
      setCurrentView("OrgEditAbleData");
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  console.log("editCustomerdata:", editCustomerdata);
  const handleFetchStocksService = async () => {};
  handleFetchStocksService();
  console.log("Error fetching OrderList:", allStocksService);

  // const handleItemsPerPageChange = (event) => {
  //   const selectedItemsPerPage = event.target.value;
  //   setItemsPerPage(selectedItemsPerPage);
  //   setCurrentPage(1)
  // };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredStocks = allStocksService?.data?.filter((stock) =>
    stock?.stockObj?.itemname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStockss = allStocksService?.data?.filter((stock) =>
    stock?.itemname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (showEditData && editCustomerdata && editCustomerdata.customerDetails?.length > 0) {
      const newData = {
        customerData: {
          name: editCustomerdata?.customerDetails[0]?.name || "",
          orggroup: editCustomerdata?.customerDetails[0]?.orggroup || "",
          reordertype: editCustomerdata?.customerDetails[0]?.reordertype || "",
          orgstockflag: editCustomerdata?.customerDetails[0]?.orgstockflag || "",
          status: editCustomerdata?.customerDetails[0]?.status || "",
        },
        addressData: {
          address1: editCustomerdata?.customerAddress[0]?.address1 || "",
          address2: editCustomerdata?.customerAddress[0]?.address2 || "",
          country: editCustomerdata?.customerAddress[0]?.country || "",
          state: editCustomerdata?.customerAddress[0]?.state || "",
          district: editCustomerdata?.customerAddress[0]?.district || "",
          city: editCustomerdata?.customerAddress[0]?.city || "",
          stategstcode: editCustomerdata?.customerAddress[0]?.stategstcode || "",
          zipcode: editCustomerdata?.customerAddress[0]?.zipcode || "",
          contactno: editCustomerdata?.customerAddress[0]?.contactno || "",
          emailid: editCustomerdata?.customerAddress[0]?.emailid || "",
          fax: editCustomerdata?.customerAddress[0]?.fax || "",
          otherinfo1: editCustomerdata?.customerAddress[0]?.otherinfo1 || "",
          otherinfo2: editCustomerdata?.customerAddress[0]?.otherinfo2 || "",
          otherinfo3: editCustomerdata?.customerAddress[0]?.otherinfo3 || "",
          addresstype: editCustomerdata?.customerAddress[0]?.addresstype || "",
          status: editCustomerdata?.customerAddress[0]?.status || "",
        },
      };
      setFormData(newData);
    }
  }, [showEditData, editCustomerdata]);


  // const totalEntries = allStocksService?.recordsTotal;
  // const startIndex = (currentPage - 1) * itemsPerPage + 1;
  // const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const modalContainerStyle = {
    position: "relative",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    height: "100vh",
  };

  const modalStyle = {
    position: "absolute",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    display: isHovered ? "block" : "none",
  };

  const triggerStyle = {
    cursor: "pointer",
  };

  const handleSearchs = (value) => {
    setSearchText(value);
  };

  const hierarchyfilteredData = hierarchyLeveldata?.filter((data) =>
    Object.values(data).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalEntries = hierarchyfilteredData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const csvData = hierarchyLeveldata
    ? hierarchyLeveldata?.map((data) => ({}))
    : [];
  useEffect(() => {
    const handleItemMasterData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          orgTxnFlag: "All",
        };
        const result = await dispatch(FetchAdminUniverse(payload));
        setUniverseData(result);
        setDataLoaded(true);
        setCurrentView("layoutFlow");
      } catch (error) {
        console.error("Error fetching AdminUniverse data:", error);
      }
    };
    if (!dataLoaded) {
      handleItemMasterData();
    }
  }, [items, dataLoaded, currentView]); // Only re-run the effect if items or dataLoaded changes


  if (!dataLoaded) {
    // Render a loading state
    return <p>Loading...</p>;
  }
  const findLabelForNode = (id) => {
    const matchingItems =
      universeData?.filter((item) => item.hierarchyLevel === id) || [];
    if (matchingItems.length > 0) {
      const labels = matchingItems.map((item) => item.name);
      const additionalInfo = matchingItems.map((item) => ({
        name: item.name,
        numberCount: item.numberCount,
        nonTxnCount: item.nonTxnCount,
        id: item.id,
        type: item.type,
        hierarchyLevel: item.hierarchyLevel,
      }));
      return { labels, additionalInfo };
    } else {
      return { labels: [`Super Stockist${id}`], additionalInfo: [] };
    }
  };
  const nodesData = ["0", "1", "2", "3"];
  const nodes = nodesData
    .flatMap((nodeId, index) => {
      const matchingItems = findLabelForNode(nodeId);
      const { labels, additionalInfo } = matchingItems;
      const hierarchyLevel = additionalInfo[0]
        ? parseInt(additionalInfo[0].hierarchyLevel)
        : parseInt(nodeId);
      const topValue = 86; // Adjust this value as needed
      return matchingItems.additionalInfo.map((info, innerIndex) => {
        const nodeIdWithIndex = `${nodeId}-${innerIndex}`;
        return {
          id: nodeIdWithIndex,
          data: {
            label: (
              <div
                style={{
                  cursor: "pointer",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: "20px",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                >
                  {info.name}
                </div>
                <Button
                  style={{
                    // color: "black",
                    borderRadius: "8px",
                    padding: "8px",
                    gap: "25px",
                  }}
                >
                  {info.numberCount > 0 && (
                    <span
                      style={{
                        padding: "8px",
                        // ... other styles
                      }}
                      onClick={() => handleNumberCountData(info)}
                    >
                      ({info.numberCount})
                    </span>
                  )}
                  {info.nonTxnCount > 0 && (
                    <span
                      style={{
                        padding: "8px",
                        // ... other styles
                      }}
                    >
                      ({info.nonTxnCount})
                    </span>
                  )}
                </Button>
                <div>Add New</div>
              </div>
            ),
          },
          position: {
            x: hierarchyLevel === 0 ? 408 : innerIndex * 222,
            y: hierarchyLevel === 0 ? 0 : topValue + (hierarchyLevel - 1) * 86,
          },
          style: {
            // Add your CSS styles here
            display: "flex",
            backgroundColor: "#fcfcfc",
            border: "#1px solid ",
            color: "black",
            borderRadius: "8px",
            padding: "10px",
            // ... other styles
          },
        };
      });
    })
    .sort((a, b) => {
      if (a.data.hierarchyLevel === b.data.hierarchyLevel) {
        return 0;
      }
      return a.data.hierarchyLevel === 0
        ? -1
        : b.data.hierarchyLevel === 0
        ? 1
        : a.data.hierarchyLevel - b.data.hierarchyLevel;
    });
  const edgesData = [
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "1", target: "4" },
    { source: "1", target: "5" },
    { source: "2", target: "2a" },
    { source: "2", target: "2b" },
    { source: "2", target: "2c" },
    { source: "2", target: "2d" },
    { source: "2", target: "2e" },
    { source: "2", target: "2f" },
    { source: "2", target: "2g" },
  ];
  const edges = edgesData.map((edgeData, index) => ({
    id: `e${index + 1}${index + 2}`,
    type: "smoothstep",
    animated: true,
    ...edgeData,
  }));
  const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  formatTimestampToDate();


  
  console.log("formData", formData);

  const options = editCustomerdata?.groups?.map((item, index) => ({
    label: item.groupname, // You can use 'groupcode' if you want to show 'groupcode'
    value: item.groupcode,
  }));
  console.log("itemssssssss :", options);


  const handleGroupChange = (event) => {
    const newFormData = {
      ...formData,
      customerData: {
        ...formData.customerData,
        orggroup: event.target.value,
      },
    };
    setFormData(newFormData);
  };

  const handleReorderTypeChange = (event) => {
    const newFormData = {
      ...formData,
      customerData: {
        ...formData.customerData,
        reordertype: event.target.value,
      },
    };
    setFormData(newFormData);
  };

  const handleStatusChange = (event) => {
    const newFormData = {
      ...formData,
      customerData: {
        ...formData.customerData,
        status: event.target.value,
      },
    };
    setFormData(newFormData);
  };

  const handleCheckBoxChange = (event) => {
    const newFormData = {
      ...formData,
      customerData: {
        ...formData.customerData,
        orgstockflag: event.target.checked ? "true" : "false",
      },
    };
    setFormData(newFormData);
  };

  const OrgHierarchyLevel = () => {
    return (
      <Stack gap={1}>
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
          <CSVLink data={csvData} filename={"failed_transactions.csv"}>
            Download Entity Details
          </CSVLink>
        </Grid>
        <Stack sx={{ display: "flex" }}>
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <SearchInput onSearch={handleSearchs} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SecondarySelect
              label="Log Levels"
              id="status-select-1"
              value={orgLevel}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Deleted", value: "Deleted" },
              ]}
              onChange={(e) => setOrgLevel(e.target.value)}
            />
          </Grid>
        </Stack>

        <Stack
          sx={{ padding: "13px 0px 2px 26px" }}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography whiteSpace={"nowrap"}>Items per page:&nbsp;</Typography>
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
              <TableRow sx={{ padding: "10px 5px !important" }}>
                <StyledTableHeaderCell>Entity Name </StyledTableHeaderCell>
                <StyledTableHeaderCell> Entity Type</StyledTableHeaderCell>
                <StyledTableHeaderCell>Stock Position</StyledTableHeaderCell>

                <StyledTableHeaderCell>Reports</StyledTableHeaderCell>
                <StyledTableHeaderCell>Purchase Orders</StyledTableHeaderCell>
                <StyledTableHeaderCell>Sales Orders</StyledTableHeaderCell>
                <StyledTableHeaderCell>Update / Delete</StyledTableHeaderCell>
              </TableRow>
            </TableHead>

            {hierarchyfilteredData && hierarchyfilteredData?.length > 0 ? (
              <TableBody>
                {hierarchyfilteredData?.map((orgs) => (
                  <>
                    {orgs?.orgList?.map((org, index) => (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {console.log("org[2", org)}

                        <StyledTableBodyCell>
                          {org[2]?.name}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {org[2]?.orgtypename}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {org[2]?.orgstockflag == "true" ? (
                            <Button onClick={() => handleOpenStockData(org)}>
                              view stock
                            </Button>
                          ) : (
                            <Typography>view stock</Typography>
                          )}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {org[2]?.orgtxnflag == "true" ? (
                            <Button onClick={() => handleOpenReportItem(org)}>
                              view
                            </Button>
                          ) : (
                            <Typography>view</Typography>
                          )}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>{org[0]}</StyledTableBodyCell>
                        <StyledTableBodyCell>{org[1]}</StyledTableBodyCell>
                        <StyledTableBodyCell>
                          <IconButton
                            onClick={() => handleEditUserData(org)}
                            sx={{
                              width: "30px",
                              height: "30px",
                              padding: "4px 5px",
                              borderRadius: "34px",
                              background: "#D5E3F7",
                            }}
                          >
                            <img src={allImgPaths.edit} alt="edit" />
                          </IconButton>
                        </StyledTableBodyCell>
                      </StyledTableRow>
                    ))}{" "}
                  </>
                ))}
              </TableBody>
            ) : (
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
        {hierarchyfilteredData && hierarchyfilteredData?.length > 0 && (
          <>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography whiteSpace={"nowrap"}>
                Showing {startIndex} to {endIndex} of {totalEntries} entries
                &nbsp;
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
                count={Math.ceil(hierarchyfilteredData?.length / itemsPerPage)}
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
          </>
        )}
      </Stack>
    );
  };

  const OrgViewStockTable = () => {
    return (
      <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
        <Grid item xs={12} md={6}>
          <SecondarySelect
            label="Select Type"
            id="status-select-1"
            value={stockCustomerType}
            options={[
              { label: "Saleable", value: "Saleable" },
              { label: "In Transit", value: "InTransit" },
              { label: "Damaged", value: "Damaged" },
            ]}
            onChange={(e) => setStockCustomerType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3} display={"flex"} alignItems={"end"}>
          <CSVLink data={csvData} filename={"viewStockPostion.csv"}>
            <Button
              sx={{
                minWidth: "150px",
                height: "46px",
                borderRadius: "10px",
                border: "1px solid #0176D3",
                background: "#E4F3FF",
                textTransform: "initial",
              }}
              fullWidth
              variant="outlined"
            >
              Export Stocks
            </Button>
          </CSVLink>
        </Grid>
        <Grid item xs={12} md={3} display={"flex"} alignItems={"end"}>
          <Button
            fullWidth
            sx={{
              minWidth: "150px",
              height: "46px",
              borderRadius: "10px",
              border: "1px solid #0176D3",
              background: "#E4F3FF",
              textTransform: "initial",
            }}
            variant="outlined"
          >
            Export All Customers Stocks
          </Button>
        </Grid>
        <Grid item xs={12}>
          <SearchInput onSearch={handleSearch} />
        </Grid>
        <Stack
          Stack
          sx={{ padding: "13px 0px 2px 26px" }}
          s
          direction={"row"}
          alignItems={"center"}
        >
          <Typography whiteSpace={"nowrap"}>Items per page:&nbsp;</Typography>
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
        <Grid item xs={12}>
          <Stack gap={1}>
            {stockCustomerType === "Saleable" ? (
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
                      <StyledTableHeaderCell>Item name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Package</StyledTableHeaderCell>
                      <StyledTableHeaderCell>
                        In Stock Quantity
                      </StyledTableHeaderCell>
                      <StyledTableHeaderCell>
                        Booked Quantity
                      </StyledTableHeaderCell>
                      <StyledTableHeaderCell>
                        Re-Order Level
                      </StyledTableHeaderCell>
                      <StyledTableHeaderCell>Sync Date</StyledTableHeaderCell>
                    </TableRow>
                    <div style={modalStyle}>
                      {/* Your modal content goes here */}
                      Modal Content
                    </div>
                  </TableHead>
                  {filteredStocks && filteredStocks.length > 0 ? (
                    <TableBody>
                      {filteredStocks?.map((stock, index) => (
                        <StyledTableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableBodyCell>
                            {stock.stockObj.itemname}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock.stockObj.itemdescription}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock.stockObj.pkgunit}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            <span> {stock.stockObj.instockqty} </span>{" "}
                            <span
                              style={modalContainerStyle}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <span style={triggerStyle}>🚩</span>
                            </span>
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock.stockObj.bookedqty}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock.stockObj.reorderlevel}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.stockObj?.lastupdatedate
                              ? formatTimestampToDate(
                                  stock?.stockObj?.lastupdatedate
                                )
                              : "N/A"}
                          </StyledTableBodyCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  ) : (
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
            ) : stockCustomerType === "InTransit" ? (
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
                      <StyledTableHeaderCell>Item name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Package</StyledTableHeaderCell>
                      <StyledTableHeaderCell>
                        Intarnsit Qty
                      </StyledTableHeaderCell>
                    </TableRow>
                    <div style={modalStyle}>Modal Content</div>
                  </TableHead>
                  {filteredStockss && filteredStockss.length > 0 ? (
                    <TableBody>
                      {filteredStockss?.map((stock, index) => (
                        <StyledTableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableBodyCell>
                            {stock?.itemname}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.itemdescription}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.pkgunit}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            <span> {stock?.intransitqty} </span>{" "}
                          </StyledTableBodyCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  ) : (
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
            ) : stockCustomerType === "Damaged" ? (
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
                      <StyledTableHeaderCell>Item name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Package</StyledTableHeaderCell>
                      <StyledTableHeaderCell>
                        Damaged Quantity
                      </StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  {filteredStocks && filteredStocks.length > 0 ? (
                    <TableBody>
                      {filteredStocks?.map((stock, index) => (
                        <StyledTableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {console.log("stock", stock)}
                          <StyledTableBodyCell>
                            {stock?.stockObj?.itemname}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.stockObj?.itemdescription}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.stockObj?.pkgunit}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell>
                            {stock?.stockObj?.damagedqty}
                          </StyledTableBodyCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableBodyCell colSpan={7} align="center">
                          No data found
                        </StyledTableBodyCell>
                      </StyledTableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            ) : null}
            {filteredStocks && filteredStocks.length > 0 && (
              <>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography whiteSpace={"nowrap"}>
                    Showing {startIndex} to {endIndex} of {totalEntries} entries
                    &nbsp;
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
                    count={Math.ceil(
                      allStocksService?.recordsTotal / itemsPerPage
                    )}
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
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const OrgEditAbleData = () => {
    const isOrgStockFlagTrue =
      editCustomerdata?.customerDetails[0]?.orgstockflag === true;

    return (
      <Stack gap={1}>
        <Grid
          sx={{
            border: "1px solid #f0ad4e",
            backgroundColor: "#f0ad4e",
            width: "90%",
            height: "20px",
            paddingLeft: "20px",
          }}
        ></Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Customer Name * :</Typography>

          <TextBox
            placeholder="Customer Name"
            sx={buttonSx}
            value={editCustomerdata?.customerDetails[0]?.name}
            disabled
          />
        </Grid>
        <Grid
          sx={{
            paddingLeft: "20px",
          }}
        >
          <Typography>Customer Zone Name * :</Typography>
          {editCustomerdata?.customerDetails[0]?.zonename}
        </Grid>
        <Grid
          sx={{
            paddingLeft: "20px",
          }}
        >
          <Typography>Customer Zone Level * :</Typography>
          {editCustomerdata?.customerDetails[0]?.zonelevel}
        </Grid>
        <Grid item xs={12} sm={6}>
          <SecondarySelect
            label="Group Name"
            required
            value={formData.customerData.orggroup}
          options={options}
          onChange={handleGroupChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SecondarySelect
            label="Re-Order Type "
            required
            value={formData.customerData.reordertype}
          onChange={handleReorderTypeChange}
          />
        </Grid>
        <Grid
          sx={{
            paddingLeft: "20px",
          }}
        >
          <Typography>Customer stock flag :</Typography>
          <Stack
            direction={"row"}
            ml={"12px"}
            gap={"15px"}
            flexWrap={"wrap"}
            alignItems={"center"}
          >
           <CustomCheckBox
            label="Browser"
            id="browser"
            sx={{ backgroundColor: "#EEE", color: "#828282" }}
            checked={formData.customerData.orgstockflag === "true"}
            onChange={handleCheckBoxChange}
          />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SecondarySelect
            label="Status*"
            required
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Mapped" },
            ]}
            onChange={handleStatusChange}
          />
        </Grid>
        <Container display={"flex"}>
          <Typography> Address Details :</Typography>

          <Accordion
            sx={{
              width: "60%",
            }}
          >
            <AccordionSummary
              sx={{
                border: "1px solid #428bca",
                backgroundColor: "#428bca",
                cursor: "pointer",
              }}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Address
            </AccordionSummary>
            <AccordionDetails>
              <Container>
                <Grid item xs={12} sm={6}>
                  <Typography>Address line1 * :</Typography>

                  <TextBox
                    placeholder="Customer Name"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.address1}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Address line 2 :</Typography>

                  <TextBox
                    placeholder=" Address line 2 "
                    sx={buttonSx}
                    value={editCustomerdata?.customerDetails[0]?.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondarySelect
                    label="Country * :*"
                    required
                    // value={formData.status || ""}
                    options={[
                      { label: "India", value: "India" },
                      { label: "America", value: "America" },
                      { label: "Others", value: "Others" },
                    ]}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, status: e.target.value })
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SecondarySelect
                    label="GST State Code * :"
                    required
                    // value={formData.status || ""}
                    options={[
                      { label: "India", value: "India" },
                      { label: "America", value: "America" },
                      { label: "Others", value: "Others" },
                    ]}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, status: e.target.value })
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>District * :</Typography>

                  <TextBox
                    placeholder="district "
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.district}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>City * :</Typography>

                  <TextBox
                    placeholder="City "
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Zip Code :</Typography>

                  <TextBox
                    placeholder="Zip Code "
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.zipcode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Contact No. * :</Typography>

                  <TextBox
                    placeholder="Contact No"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.contactno}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Email Id * :</Typography>

                  <TextBox
                    placeholder="Email id"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.emailid}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>Fax* :</Typography>

                  <TextBox
                    placeholder="Fax id"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.fax}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Other info 1 :</Typography>

                  <TextBox
                    placeholder="Other info 1"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.otherinfo1}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>Other info 2 :</Typography>

                  <TextBox
                    placeholder="Other info 2"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.otherinfo2}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>Other info 3 :</Typography>

                  <TextBox
                    placeholder="Other info 3"
                    sx={buttonSx}
                    value={editCustomerdata?.customerAddress[0]?.otherinfo3}
                  />
                </Grid>
              </Container>
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            sx={{ fontSize: "18px", mt: 1 }}
            size="small"
          >
            Update Customer
          </Button>
        </Container>
      </Stack>
    );
  };

  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} sx={{ height: "70vh" }}>
        {currentView === "layoutFlow" && !showHierarchyLevel && (
          <LayoutFlow initialEdges={edges} initialNodes={nodes} />
        )}
        {currentView === "OrgHierarchyLevel" && <OrgHierarchyLevel />}
        {currentView === "OrgViewStockTable" && <OrgViewStockTable />}
        {currentView === "OrgEditAbleData" && <OrgEditAbleData />}
      </Grid>
    </Grid>
  );
};

export default MyUniverse;
