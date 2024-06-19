import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAdminEntityLogs } from "../../../../../redux/actions/sales/order";
import {
  Button,
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
import {
  PrimarySelect,
  SecondarySelect,
  TextBox,
} from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

const ViewLogs = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewLogsData, setViewLogsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logLevelData, setLogLevelData] = useState("INFO");
  const [searchText, setSearchText] = useState("");
  // const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // setStartDate(dayjs("2023-01-01"));
    // setLastDate(dayjs("2024-01-02"));
  }, []);
  
  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          orgType: "superstockist",
          level: logLevelData,
          logStartDate: 1704911400000,
          logEndDate:1705013080565,
        };
        const result = await dispatch(FetchAdminEntityLogs(payload));
        setViewLogsData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };
    if (!buttonClicked) {
      fetchData();
    }
  }, [dispatch, items, logLevelData]);

  useEffect(() => {
    const fetchDataOnButtonClick = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          orgType: "superstockist",
          level: logLevelData,
          logStartDate: new Date(startDate).getTime(),
          logEndDate: new Date(lastDate).getTime(),
        };

        const result = await dispatch(FetchAdminEntityLogs(payload));
        setViewLogsData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };
    if (buttonClicked) {
      fetchDataOnButtonClick();
      setButtonClicked(false);
    }
  }, [buttonClicked, dispatch, items, logLevelData, startDate, lastDate]);


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

  const filteredData = viewLogsData?.filter((data) =>
    Object.values(data).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalEntries = filteredData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderData = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log('currentOrderData',currentOrderData)

  console.log("startDate", startDate);
  console.log("lastDate", lastDate);
  const ViewLogsTable = () => {
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
                <StyledTableHeaderCell>S No</StyledTableHeaderCell>
                <StyledTableHeaderCell>Log Level</StyledTableHeaderCell>
                <StyledTableHeaderCell>Log Date</StyledTableHeaderCell>
                <StyledTableHeaderCell>Log Message</StyledTableHeaderCell>
                <StyledTableHeaderCell>Loged By</StyledTableHeaderCell>
                <StyledTableHeaderCell>Source</StyledTableHeaderCell>
                <StyledTableHeaderCell>Process Name</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {filteredData && filteredData.length > 0 ? (
              <TableBody>
                {filteredData?.map((logsData, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                    <StyledTableBodyCell> {logsData?.level === ""
                          ? "-"
                          : logsData?.level}</StyledTableBodyCell>
                    <StyledTableBodyCell>
                    {logsData?.txndate === ""
                          ? "-"
                          : logsData?.txndate} 
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    {logsData?.dmslogmsg === ""
                          ? "-"
                          : logsData?.dmslogmsg}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    {logsData?.userloginid === ""
                          ? "-"
                          : logsData?.userloginid}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    {logsData?.txnsource === ""
                          ? "-"
                          : logsData?.txnsource}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                    {logsData?.processname === ""
                          ? "-"
                          : logsData?.processname}
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
        {filteredData && filteredData.length > 0 && (
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
          </>
        )}
      </Stack>
    );
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Log Level"
          id="status-select-1"
          value={logLevelData}
          options={[
            { label: "INFO", value: "INFO" },
            { label: "ERROR", value: "ERROR" },
          ]}
          onChange={(e) => setLogLevelData(e.target.value)}
        />
      </Grid>
      <Grid item container xs={12} md={6} columnSpacing={"20px"}>
        <Grid item xs={6}>
          <Typography color={"#121212"} fontWeight={"300"}>
            Start Date
          </Typography>

          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  />

        </Grid>
        <Grid item xs={6}>
          <Typography color={"#121212"} fontWeight={"300"}>
            End Date
          </Typography>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e) => setLastDate(e.target.value)}
                name="endDate"
                placeholder="End Date(MM/DD/YYYY)"
                // value={lastDate || ""}
                id="endDate"
                
                sx={{
                  [`& .${outlinedInputClasses.root}`]: {
                    height: "62px",
                  },
                  [`& .${outlinedInputClasses.notchedOutline}`]: {
                    border: "none",
                    borderRadius: "10px",
                    // backgroundColor: "#F0F0F0",
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider> */}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <SearchInput onSearch={handleSearch} />
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={handleButtonClick}
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
          Refresh Logs
        </Button>
      </Grid>
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
      <Grid item xs={12}>
        <ViewLogsTable />
      </Grid>
    </Grid>
  );
};

export default ViewLogs;
