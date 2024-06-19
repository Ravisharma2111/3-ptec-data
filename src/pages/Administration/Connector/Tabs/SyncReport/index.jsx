import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchConnectorsData,
  fetchFailedTransactionList,
} from "../../../../../redux/actions/sales/order";
import {
  Grid,
  Modal,
  Box,
  Pagination,
  PaginationItem,
  Paper,
  IconButton,
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
import {
  PrimarySelect,
  SearchInput,
  SecondarySelect,
} from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
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

const SyncReport = () => {
  const dispatch = useDispatch();
  const [syncConnectorData, setSyncConnectorData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [syncReprtData, setSyncReportData] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [searchTexts, setSearchTexts] = useState("");
  const [failedTransaction, setFailedTransaction] = useState([]);

  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const FetchSyncConnectorsData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          syncStatusFlag: syncReprtData,
        };

        const result = await dispatch(FetchConnectorsData(payload));
        setSyncConnectorData(result?.connectorDetails);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    FetchSyncConnectorsData();
  }, [syncReprtData]);

  const handleSearch = (term) => {
    setSearchText(term);
  };

  const filteredData = syncConnectorData?.filter((data) =>
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

  const totalEntries = syncConnectorData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const handleInvoiceData = async (syncData, buttonType) => {
    try {
      let txnType = "FailedTxns";

      if (buttonType === "GITInvoice") {
        txnType = "GITInvoice";
      } else if (buttonType === "Invoice") {
        txnType = "Invoice";
      } else if (buttonType === "Purchase") {
        txnType = "Purchase";
      }

      const payload = {
        apiToken: items,
        txnSource: "Application",
        txnType,
        entityId: syncData?.orgid,
      };
      const result = await dispatch(fetchFailedTransactionList(payload));
      setFailedTransaction(result);
      setIsOpenInfoModal(!isOpenInfoModal);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };

  const handleSearchs = (item) => {
    setSearchTexts(item);
  };

  console.log("Error fetching searchTexts:", searchTexts);

  const filteredDatas = failedTransaction?.filter((data) =>
    Object.values(data).some((value) =>
      value.toString().toLowerCase().includes(searchTexts.toLowerCase())
    )
  );

  console.log("Error fetching OrderList:", failedTransaction);

  const totalEntriess = filteredDatas?.length;
  const startIndexs = (currentPage - 1) * itemsPerPage + 1;
  const endIndexs = Math.min(currentPage * itemsPerPage, totalEntriess);

  const handleCloseModal = () => {
    setIsOpenInfoModal(false);
  };
  const SyncReportTable = () => {
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
                <StyledTableHeaderCell>Entity Zone</StyledTableHeaderCell>
                <StyledTableHeaderCell>Entity Info1</StyledTableHeaderCell>
                <StyledTableHeaderCell>Entity Info3</StyledTableHeaderCell>
                <StyledTableHeaderCell>Soft Used</StyledTableHeaderCell>
                <StyledTableHeaderCell>GIT Invoices</StyledTableHeaderCell>
                <StyledTableHeaderCell>Pending Invoices</StyledTableHeaderCell>
                <StyledTableHeaderCell>Pending Purchase</StyledTableHeaderCell>
                <StyledTableHeaderCell>Stock Sync Date</StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Unmapped Item Count
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            {filteredData && filteredData?.length > 0 ? (
              <TableBody>
                {filteredData.map((syncData, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.orgname === "" ? "-" : syncData?.orgname}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.entityTypeName === ""
                        ? "-"
                        : syncData?.entityTypeName}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.orgzonename === ""
                        ? "-"
                        : syncData?.orgzonename}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>

                    {syncData?.otherinfo1 !== undefined &&
                          syncData?.otherinfo1 !== ""
                            ? syncData?.otherinfo1
                            : "-"}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell>
                      {syncData?.otherinfo3 === "" ? "-" : syncData?.otherinfo3}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.softUsed === "" ? "-" : syncData?.softUsed}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.failedGitTxnInvoicesCount > 0 ? (
                        <Button
                          onClick={() =>
                            handleInvoiceData(syncData, "GITInvoice")
                          }
                        >
                          {syncData?.failedGitTxnInvoicesCount}&nbsp;
                          {syncData?.failedGitTxnInvoicesDate}
                        </Button>
                      ) : (
                        <>
                          {syncData?.failedGitTxnInvoicesCount}&nbsp;
                          {syncData?.failedGitTxnInvoicesDate}
                        </>
                      )}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.failedTxnInvoicesCount > 0 ? (
                        <Button
                          onClick={() => handleInvoiceData(syncData, "Invoice")}
                        >
                          {syncData?.failedTxnInvoicesCount}&nbsp;
                          {syncData?.failedTxnInvoicesDate}
                        </Button>
                      ) : (
                        <>
                          {syncData?.failedTxnInvoicesDate}&nbsp;
                          {syncData?.failedTxnInvoicesDate}
                        </>
                      )}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.failedTxnPurchaseCount > 0 ? (
                        <Button
                          onClick={() =>
                            handleInvoiceData(syncData, "Purchase")
                          }
                        >
                          {syncData?.failedTxnPurchaseCount}&nbsp;
                          {syncData?.failedTxnPurchaseDate}
                        </Button>
                      ) : (
                        <>
                          {syncData?.failedTxnPurchaseCount}&nbsp;
                          {syncData?.failedTxnPurchaseDate}
                        </>
                      )}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.gitdate}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.itempendingcount}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {syncData?.status}
                    </StyledTableBodyCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <StyledTableRow>
                  <StyledTableBodyCell colSpan={13} align="center">
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
        <Modal
          open={isOpenInfoModal}
          // onClose={handleCloseModal}
          aria-labelledby="add-more-item-info-title"
          aria-describedby="add-more-item-info-description"
          disableBackdropClick={true}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70vw", // 70% of the viewport width
              height: "70vh", // 70% of the viewport height
              bgcolor: "#FFF",
              borderRadius: "20px",
              boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.10)",
              padding: "24px",
              overflowY: "auto", // Enable vertical scrolling if content exceeds the height
            }}
          >
            <Stack display={"flex"}>
              <Grid item xs={8}>
                <SearchInput onSearch={handleSearchs} />
              </Grid>

              <Grid>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "13px",
                    top: "19px",
                    color: "black",
                  }}
                  onClick={handleCloseModal}
                >
                  <img src={allImgPaths.close} alt="close" />
                </IconButton>
              </Grid>
              <Grid
                sx={{ padding: "13px 0px 13px 20px" }}
                direction={"row"}
                alignItems={"center"}
              >
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
              </Grid>
            </Stack>
            <TableContainer
              sx={{ overflowX: "hidden" }}
              component={Paper}
              elevation={0}
            >
              <Table
                sx={{ minWidth: 650, width: "auto", borderRadius: 100 }}
                aria-label="simple table"
              >
                <TableHead
                  sx={{
                    backgroundColor: "#D5E3F7",
                    padding: "20px 5px !important",
                  }}
                >
                  <TableRow>
                    <StyledTableHeaderCell>Sync Date</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Txn Date</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Invoice No.</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Items Key(s) </StyledTableHeaderCell>
                    <StyledTableHeaderCell>Invoice Date</StyledTableHeaderCell>
                    <StyledTableHeaderCell>User</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                {filteredDatas && filteredDatas?.length > 0 ? (
                  <TableBody>
                    {filteredDatas?.map((syncData, index) => (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableBodyCell>
                          {syncData?.updatedate === ""
                            ? "-"
                            : syncData?.updatedate}{" "}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {syncData?.invoicedate !== undefined &&
                          syncData?.invoicedate !== ""
                            ? syncData?.invoicedate
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                        {syncData?.invoiceno !== undefined &&
                          syncData?.invoiceno !== ""
                            ? syncData?.invoiceno
                            : "-"}
          
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {syncData?.lineItemKeys &&
                            syncData?.lineItemKeys.map((item, i) => (
                              <span key={i}>{item}&nbsp;</span>
                            ))}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell>
                          {syncData?.invoicedate === ""
                            ? "-"
                            : syncData?.invoicedate}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {syncData?.updatedby === ""
                            ? "-"
                            : syncData?.updatedby}
                        </StyledTableBodyCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableBodyCell colSpan={13} align="center">
                        No data found in table
                      </StyledTableBodyCell>
                    </StyledTableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {filteredDatas && filteredDatas?.length > 0 && (
              <>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography whiteSpace={"nowrap"}>
                    Showing {startIndexs} to {endIndexs} of {totalEntriess}{" "}
                    entries &nbsp;
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
                    count={Math.ceil(failedTransaction?.length / itemsPerPage)}
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
          </Box>
        </Modal>
      </Stack>
    );
  };

  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Log Level"
          id="status-select-1"
          value={syncReprtData}
          options={[{ label: "All", value: "All" }]}
          onChange={(e) => setSyncReportData(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} alignItems={"end"}>
        <SearchInput onSearch={handleSearch} />
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
        <SyncReportTable />
      </Grid>
    </Grid>
  );
};

export default SyncReport;
