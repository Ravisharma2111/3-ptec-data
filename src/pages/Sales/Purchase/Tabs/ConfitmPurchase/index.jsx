import React, { useEffect, useState } from "react";
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SearchInput from "../../../../../components/SearchInput";
import { PrimarySelect } from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { FetchPurchaseList } from "../../../../../redux/actions/sales/order";
import allImgPaths from "../../../../../assets/images/allImgPaths";

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
const ConfirmPurchase = () => {
  const dispatch = useDispatch();

  const {
    customerList,
    isLoadingOrderInfo,
    searchItems,
    orderInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const [confirmPurchaseList, setConfirmPurchaseList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const FetchCustomerReorderItems = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          startIndex: 0,
          recordLimit: 10,
          searchText: "",
          searchRegexFlag: false,
          drawPageNo: 1,
        };
        console.log("confirmPurchaseList payload", payload);

        const result = await dispatch(FetchPurchaseList(payload));
        setConfirmPurchaseList(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    FetchCustomerReorderItems();
  }, []);
  console.log("confirmPurchaseList", confirmPurchaseList);

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
     
  const totalEntries = confirmPurchaseList?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const handleSearchs = (value) => {
    setSearchText(value);
  };

  const confirmTransactionData = confirmPurchaseList?.filter((data) =>
  data.customername.toLowerCase().includes(searchText.toLowerCase())
);


  const ConfirmPurchaseTable = () => {
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
                <StyledTableHeaderCell>Parent Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Invoice Number</StyledTableHeaderCell>
                <StyledTableHeaderCell>Invoice Date</StyledTableHeaderCell>
                <StyledTableHeaderCell>Sync Date</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {confirmTransactionData && confirmTransactionData.length > 0 ? (
            <TableBody>
            <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>
                     
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    </StyledTableBodyCell>
                  </StyledTableRow>
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
        {confirmTransactionData && confirmTransactionData.length > 0  &&(
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
            count={Math.ceil(confirmTransactionData?.length / itemsPerPage)}
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
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12}>
      <SearchInput onSearch={handleSearchs} />
      </Grid>
      <Stack sx={{ padding: "13px 0px 2px 26px" }}  direction={"row"} alignItems={"center"}>
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
        <ConfirmPurchaseTable />
      </Grid>
    </Grid>
  );
};

export default ConfirmPurchase;
