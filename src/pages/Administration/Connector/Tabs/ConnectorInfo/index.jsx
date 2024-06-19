import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchConnectorsData } from "../../../../../redux/actions/sales/order";
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

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  justifyContent: "center",
  textAlign: "center",
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

const ConnectorInfo = () => {
  const dispatch = useDispatch();
  const [connectorData, setConnectorData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [logLevelData, setLogLevelData] = useState("INFO");
  const [searchText, setSearchText] = useState("");

  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const handleConnectorData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          syncStatusFlag: "",
        };

        const result = await dispatch(FetchConnectorsData(payload));
        setConnectorData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleConnectorData();
  }, []);
  console.log("ConnectorData", connectorData);

  const handleSearch = (term) => {
    setSearchText(term);
  };

  const filteredData = connectorData?.filter((data) =>
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

  const totalEntries = connectorData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const ConnectorInfoTable = () => {
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
                <StyledTableHeaderCell>Entity Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Type</StyledTableHeaderCell>
                <StyledTableHeaderCell>Soft Used</StyledTableHeaderCell>
                <StyledTableHeaderCell>Login Id</StyledTableHeaderCell>
                <StyledTableHeaderCell>Created On</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {filteredData && filteredData.length > 0 ? (
              <TableBody>
                {filteredData.map((connectData, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                    <StyledTableBodyCell>{connectData?.orgname}</StyledTableBodyCell>
                    <StyledTableBodyCell>{connectData?.entityTypeName}</StyledTableBodyCell>
                    <StyledTableBodyCell>{connectData?.softUsed}</StyledTableBodyCell>
                    <StyledTableBodyCell>{connectData?.loginId}</StyledTableBodyCell>
                    <StyledTableBodyCell>{connectData?.createdate}</StyledTableBodyCell>
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
        {filteredData && filteredData?.length > 0 && (
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
            count={Math.ceil(filteredData?.length / itemsPerPage)}
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
            ) }
      </Stack>
    );
  };

  return (
    <Grid  rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12}>
        <SearchInput onSearch={handleSearch} />
      </Grid>
     <Stack
        sx={{ padding: "14px 0px 14px 20px" }}
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
        <ConnectorInfoTable />
      </Grid>
    </Grid>
  );
};

export default ConnectorInfo;
