import React, { useEffect, useState } from "react";
import {
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Table,
  TableBody,
  Button,
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
import {
  FetchEntityZone,
  FetchChildZone,
} from "../../../../../redux/actions/sales/order";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ...sx,
}));

const StyledTableBodyCell = styled(TableCell)(({ theme, sx }) => ({
  textAlign: "left",
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

const ViewZone = () => {
  const dispatch = useDispatch();
  const [viewZoneData, setViewZoneData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewChildZoneData, setViewChildZoneData] = useState([]);

  const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleItemMasterData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
        };

        const result = await dispatch(FetchEntityZone(payload));
        setViewZoneData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleItemMasterData();
  }, [items]);

  console.log("viewZoneData", viewZoneData);

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

  const filteredData = viewZoneData?.filter((data) =>
    Object.values(data).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalEntries = viewZoneData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderData = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleViewChildZone = async (parentzoneid) => {
    console.log("parentzoneid", parentzoneid);
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
        parentZoneIds: [
          "59d35c0de4b0c1f361b0d722",
          "59d35c0de4b0c1f361b0d729",
          "59d35c0de4b0c1f361b0d727",
        ],
      };
      console.log("payload", payload);

      const result = await dispatch(FetchChildZone(payload));
      setViewChildZoneData(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  console.log("viewChildZoneData", viewChildZoneData);
  const ZoneTable = () => {
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
                <StyledTableHeaderCell>Zone Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Group Number</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {currentOrderData && currentOrderData?.length > 0 ? (
              <>
                <TableBody>
                  {currentOrderData.map((zoneData, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableBodyCell>
                        {" "}
                        <Button
                          onClick={() => handleViewChildZone(zoneData?.zoneid)}
                        >
                          {" "}
                          {zoneData?.name}{" "}
                        </Button>
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        {zoneData?.groupname}
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

        {currentOrderData && currentOrderData?.length > 0 && (
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
        <ZoneTable />
      </Grid>
    </Grid>
  );
};

export default ViewZone;
