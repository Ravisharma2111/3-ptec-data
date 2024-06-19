import React, { useEffect, useState } from "react";
import {
  Grid,
    Button,
  Pagination,
  PaginationItem,
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
import { get, size } from "lodash";
import { format } from "date-fns";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  PrimarySelect,
  SearchInput,
  SecondarySelect,
} from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceList,FetchPrintInvoiceData } from "../../../../../redux/actions/sales/order";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

const ViewInvoice = () => {
  const dispatch = useDispatch();
  const {
    customerList,
    isLoadingSearchItems,
    searchItems,
    itemInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [customerName, setCustomerName] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [invoiceDataPrint, setInvoiceDataPrint] = useState('');
  const [printInvoiceState, setPrintInvoiceState] = useState(false);

  const getOptionsForCustomerList = (list) => {
    let options = [];
    if (size(list)) {
      list.forEach(({ name, orgid }) => {
        options.push({ label: name, value: orgid });
      });
    }
    return options;
  };
  const [viewInvoiceData, setViewInvoiceData] = useState([]);
  const [printInvoice, setPrintInvoice] = useState("");

  const [statuS, setStatus] = useState("Delivered");
  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const fetchInvoiceData = async () => {
      const payload = {
        apiToken: items,
        txnSource: "Application",
        startIndex: "0",
        recordLimit: itemsPerPage.toString(),
        drawPageNo: "1",
        searchText,
        searchRegexFlag: false,
        entityId: "59d35cfae4b0c1f361b0dd37",
        customerId: customerName,
        status: statuS,
      };
      try {
        const result = await dispatch(fetchInvoiceList(payload));
        setViewInvoiceData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    fetchInvoiceData();
  }, [customerName, statuS,itemsPerPage,searchText]);

console.log('printInvoice',printInvoice)
console.log('invoiceDataPrint',invoiceDataPrint)

  const filteredData = viewInvoiceData?.data?.filter((data) =>
    data.customername.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const totalEntries = viewInvoiceData?.recordsTotal;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const handleInvoicePrint = async(data) => {
    setInvoiceDataPrint(data?._id?.$oid );
    console.log('data',data?._id?.$oid)
    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        failedTxnFlag: false,
        invoiceId: invoiceDataPrint,
      };
  console.log('payload',payload   )

      const result = await dispatch(FetchPrintInvoiceData(payload));
      setPrintInvoice(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }

    setPrintInvoiceState(true)
    // fetchDataForInvoicePrint()
    // setShowPrintInvoice(true);
    // setShowInvoiceAgainistOrder(false);
  
  };
  console.log('printInvoice',printInvoice   )
  const ViewInvoiceTable = () => {
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
                <StyledTableHeaderCell>Customer name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Invoice Number</StyledTableHeaderCell>
                <StyledTableHeaderCell>Invoice Date</StyledTableHeaderCell>
                <StyledTableHeaderCell>Sync Date</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {filteredData && filteredData?.length > 0 ? (
            <TableBody>
              {
                filteredData?.map((data, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>
                      {data.customername}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell >
                      {data.dmsinvoiceno}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell><Button onClick={() => handleInvoicePrint(data)}>
                      {data?.invoicedate} </Button>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data?.updatedate}
                    </StyledTableBodyCell>
                  </StyledTableRow>
                )
              ) }
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
        {filteredData && filteredData?.length > 0  &&(
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
            count={Math.ceil(viewInvoiceData?.recordsTotal / itemsPerPage)}
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
    <>
     { !printInvoiceState ? (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Customer Name"
          id="customer-name-select"
          value={customerName}
          options={getOptionsForCustomerList()} // Assuming this function doesn't depend on `customerList`
          onChange={(e) => setCustomerName(e.target.value)}
        />
       
      </Grid>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Status 1"
          id="status-select-1"
          value={statuS}
          options={[
            { label: "Delivered", value: "Delivered" },
            { label: "InTransit", value: "InTransit" },
          ]}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <SearchInput onSearch={handleSearch} />
      </Grid>
      <Stack  sx={{ padding: "13px 0px 2px 26px" }}  direction={"row"} alignItems={"center"}>
          <Typography whiteSpace={"nowrap"}>Items per page:&nbsp;</Typography>
          <PrimarySelect
            options={ItemPerPage}
            name={"items-per-page"}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            sx={{
              backgroundColor: "transparent",
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
        <ViewInvoiceTable />
      </Grid>
    </Grid> )
    :  (console.log ('cccccccccccccccccccccccccc') )

  }
    </>
  )
};

export default ViewInvoice;
