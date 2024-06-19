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
import { FetchItemMasterData } from "../../../../../redux/actions/sales/order";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
    
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

const ViewItemMaster = () => {
  const dispatch = useDispatch();
  const [itemMasterData, setItemMasterData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);



  const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleItemMasterData = async () => {
      try {
        const payload = {
          apiToken: items,
          recordLimit:  itemsPerPage.toString(),
          txnSource: "Application",
          startIndex:(currentPage - 1) * itemsPerPage,
          drawPageNo: currentPage.toString(),
          searchText,
        };

        const result = await dispatch(FetchItemMasterData(payload));
        setItemMasterData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleItemMasterData();
  }, [searchText, items,itemsPerPage]);
  console.log("itemMasterData", itemMasterData);

  
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

  const filteredData = itemMasterData?.data?.filter((data) =>
  Object.values(data).some((value) =>
    value.toString().toLowerCase().includes(searchText.toLowerCase())
  )
);

  const totalEntries = itemMasterData?.recordsTotal;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log('currentOrderData',currentOrderData)

  const ItemMasterTable = () => {
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
                <StyledTableHeaderCell>Item Code</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Sku Flag</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Sku Code</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Info Flag</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Group</StyledTableHeaderCell>
                <StyledTableHeaderCell>Package Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Child Package Unit
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Child Package Quantity
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>Unit price</StyledTableHeaderCell>
                <StyledTableHeaderCell>Taxes</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            { filteredData && filteredData?.length > 0 ? (
              <>
                <TableBody>
                  {filteredData?.map((itemData, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableBodyCell>
                        {itemData?.itemcode}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.itemname}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.itemdescription}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.iteminfoflag}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.itemskucode}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.itemskuflag}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.itemgroup}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.pkgunit}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.childpkgunit}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.childpkgqty}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {itemData?.pkgunitrate}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {
                          itemData?.itemtaxfields["59d35c47e4b0c1f361b0d955"]
                            ?.taxcode
                        }
                      </StyledTableBodyCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <TableBody>
                <StyledTableRow
                 
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableBodyCell colSpan={12} align="center">
                    No Data Found In Table
                  </StyledTableBodyCell>
                </StyledTableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        { filteredData && filteredData?.length > 0 && (
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
            count={Math.ceil(totalEntries / itemsPerPage)}
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
        <SearchInput onSearch={handleSearch} />
      </Grid>
      <Grid item xs={12} sm={4} display={"flex"} alignItems={"center"}>
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
      </Grid>
      <Grid item xs={12}>
        <ItemMasterTable />
      </Grid>
    </Grid>
  );
};

export default ViewItemMaster;
