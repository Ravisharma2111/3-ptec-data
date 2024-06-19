import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Paper,
  outlinedInputClasses,
  Popover,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SecondarySelect from "../../../../../components/SecondarySelect";
import { PrimarySelect, SearchInput } from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllStocksService } from "../../../../../redux/actions/sales/order";

import { CSVLink } from "react-csv";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  justifyContent: "center",
  textAlign: "center",
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

const ViewStockPosition = () => {

  const dispatch = useDispatch();
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allStocksService, setAllStocksService] = useState([]);
  const [stockCustomerType, setStockCustomerType] = useState("Saleable");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [isHovered, setIsHovered] = useState(false);
  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const handleFetchStocksService = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          stockStatus: stockCustomerType,
          entityId: "59d35cfae4b0c1f361b0dd37",
        };

        const result = await dispatch(FetchAllStocksService(payload));
        setAllStocksService(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };
    handleFetchStocksService();
  }, [dispatch, items,stockCustomerType]);
  console.log("Error fetching OrderList:", allStocksService);
const handleItemsPerPageChange = (event) => {
  const selectedItemsPerPage = event.target.value;
  setItemsPerPage(selectedItemsPerPage);
  setCurrentPage(1)
};

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const handleSearch = (term) => {
  setSearchTerm(term);
};

  const filteredStocks = allStocksService?.data?.filter((stock) =>
    stock?.stockObj?.itemname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStockss = allStocksService?.data?.filter((stock) =>
  stock?.itemname?.toLowerCase().includes(searchTerm.toLowerCase())
);



  const csvData = allStocksService?.data
    ? allStocksService?.data?.map((stock) => ({
        "Item name": stock?.stockObj?.itemname,
        Description: stock?.stockObj?.itemdescription,
        Package: stock?.stockObj?.pkgunit,
        "In Stock Quantity": stock?.stockObj?.instockqty,
        "Booked Quantity": stock?.stockObj?.bookedqty,
        "Re-Order Level": stock?.stockObj?.reorderleve,
        "Sync Date": stock?.stockObj?.updatedate,
      }))
    : [];

  const totalEntries = allStocksService?.recordsTotal;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);


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
    const formatTimestampToDate = (timestamp) => {
      const date = new Date(timestamp);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };
    
  formatTimestampToDate()
  const ViewStockTable = () => {
    
    return (
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
                  <StyledTableHeaderCell>Booked Quantity</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Re-Order Level</StyledTableHeaderCell>
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      ? formatTimestampToDate(stock?.stockObj?.lastupdatedate)
                      : "N/A"}
                    </StyledTableBodyCell>
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
                 <div style={modalStyle}>
                  Modal Content
                </div>
              </TableHead>
              {filteredStockss && filteredStockss.length > 0 ? (
              <TableBody>
              
                {filteredStockss?.map((stock, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
              )  : (
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
        {filteredStocks && filteredStocks.length > 0  &&(
          <>
        <Stack direction={"row"} alignItems={"center"}>
        <Typography whiteSpace={"nowrap"}>Showing {startIndex} to {endIndex} of {totalEntries} entries &nbsp;</Typography>
         
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
            count={Math.ceil( allStocksService?.recordsTotal / itemsPerPage)}
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
      <Stack Stack  sx={{ padding: "13px 0px 2px 26px" }}s direction={"row"} alignItems={"center"}>
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
        <ViewStockTable />
      </Grid>
    </Grid>
  );
};

export default ViewStockPosition;
