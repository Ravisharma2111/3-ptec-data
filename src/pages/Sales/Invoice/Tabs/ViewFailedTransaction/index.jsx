import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import {
  Grid,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchFailedTransactionList,FetchPrintInvoiceData } from "../../../../../redux/actions/sales/order";
import { ItemPerPage } from "../../../../../shared/constants";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  PrimarySelect,
  SearchInput,
  SecondarySelect,
} from "../../../../../components";
// import {fetchFailedTransactionList } from "../../../../redux/actions/sales/order";

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
const ViewFailedTransaction = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [FailedTransactionData, setFailedTransactionData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const items = localStorage.getItem("apiToken");
  const [printInvoice, setPrintInvoice] = useState([]);
  const [invoiceDataPrint, setInvoiceDataPrint] = useState("");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          txnType: "FailedTxns",
          entityId: "59d35d2ee4b0c1f361b0dfa6",
        };
        const result = await dispatch(fetchFailedTransactionList(payload));
        setFailedTransactionData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  console.log("FailedTransactionData", FailedTransactionData);

  const handleSearchs = (value) => {
    setSearchText(value);
  };

  const FailedTransaction = FailedTransactionData?.filter((data) =>
    data.customername.toLowerCase().includes(searchText.toLowerCase())
  );

  const csvData = FailedTransaction
    ? FailedTransaction?.map((data) => ({
        "Customer Name": data.customername,
        "Customer Type": data.customertypename,
        "Txn Number": data.invoiceno,
        "Txn Date": data.invoicedate,
        "Error Msg": data.txnerrormsg,
        "Txn Type": data.type,
        "Sync Date": data.updatedate,
      }))
    : [];

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
    
   
  const totalEntries = FailedTransactionData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const handleInvoiceData = async(data) => {
      setInvoiceDataPrint(data?._id?.$oid );
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
  
    
    };
  
  return (
    <Stack gap={1}>
      <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
        <CSVLink data={csvData} filename={"failed_transactions.csv"}>
          Export Failed Transactions
        </CSVLink>
      </Grid>
      <Grid item xs={12}>
        <SearchInput onSearch={handleSearchs} />
      </Grid>
      <Stack  sx={{ padding: "13px 0px 2px 26px" }}  direction={"row"} alignItems={"center"}>
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
            <TableRow sx={{ padding: "20px 5px !important" }}>
              <StyledTableHeaderCell>Customer Name </StyledTableHeaderCell>
              <StyledTableHeaderCell>Customer Type</StyledTableHeaderCell>
              <StyledTableHeaderCell>Txn Number</StyledTableHeaderCell>

              <StyledTableHeaderCell>Txn date</StyledTableHeaderCell>
              <StyledTableHeaderCell>Error msg</StyledTableHeaderCell>
              <StyledTableHeaderCell>Txn Type</StyledTableHeaderCell>
              <StyledTableHeaderCell>Sync Date</StyledTableHeaderCell>
            </TableRow>
          </TableHead>

          {FailedTransaction && FailedTransaction?.length > 0 ? (
          <TableBody>
            {FailedTransaction?.map((data, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableBodyCell>{data.customername}</StyledTableBodyCell>
                <StyledTableBodyCell>
                  {data.customertypename}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{data.invoiceno}</StyledTableBodyCell>
                <StyledTableBodyCell> <Button onClick={() => handleInvoiceData(data)}>
                {data.invoicedate}
                </Button></StyledTableBodyCell>

                <StyledTableBodyCell>{data.txnerrormsg}</StyledTableBodyCell>
                <StyledTableBodyCell>{data.type}</StyledTableBodyCell>
                <StyledTableBodyCell>{data.updatedate}</StyledTableBodyCell>
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
      {FailedTransaction && FailedTransaction?.length > 0  &&(
          <>x
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
          count={Math.ceil(FailedTransaction?.length / itemsPerPage)}
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

export default ViewFailedTransaction;
