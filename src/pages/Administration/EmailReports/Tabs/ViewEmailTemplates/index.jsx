import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchTemplatesData,DeleteAdminUsers } from "../../../../../redux/actions/sales/order";
import {
  Box,
  Grid,
  Modal,
  IconButton,
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ItemPerPage } from "../../../../../shared/constants";
import { PrimarySelect } from "../../../../../components";
import allImgPaths from "../../../../../assets/images/allImgPaths";

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
const ViewEmailTemplates = () => {
  const tableStyle = {
    display: "flex",
    flexDirection: "column",
    borderCollapse: "collapse",
    width: "500px", // Adjust the width as needed
    margin: "auto", // Center the table horizontally
  };

  const cellStyle = {
    // border: "1px solid #ddd",
    padding: "8px",
    width: "300px",
    textAlign: "left",
  };

  const dispatch = useDispatch();
  const [templatesData, setTemplatesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [templatesModalData, setTemplatesModalData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [templateDeleteData, setTemplateDeleteData] = useState([]);

  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const handleTempltesData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          fileDataSource: "email-reports-fetch",
          "Content-Type": "application/json",
        };
        const requestBody = {
          reportNameKey: "Sales_Report",
          reportTemplateName: "sales template",
        };

        const result = await dispatch(FetchTemplatesData(payload, requestBody));
        setTemplatesData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleTempltesData();
  }, []);

  const handleTempltesData = async () => {
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
        fileDataSource: "email-reports-fetch",
        // "Content-Type": "application/json",
      };
      

      const result = await dispatch(DeleteAdminUsers(payload));
      setTemplateDeleteData(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  console.log("templateDeleteData", templateDeleteData);

  const handleOpenModal = (templatesData) => {
    setIsOpenInfoModal(!isOpenInfoModal);
    setTemplatesModalData(templatesData);
  };
  console.log("templatesData", templatesModalData);
  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setIsOpenInfoModal(false);
  };

  const totalEntries = templatesData?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderData = templatesData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const EmailTemplatesTable = () => {
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
                <StyledTableHeaderCell>Template Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Report Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Report Zone</StyledTableHeaderCell>
                <StyledTableHeaderCell>All Child Zone</StyledTableHeaderCell>
                <StyledTableHeaderCell>All Hirearchy</StyledTableHeaderCell>
                <StyledTableHeaderCell>Customer Type</StyledTableHeaderCell>
                <StyledTableHeaderCell>Customer Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Report period</StyledTableHeaderCell>
                <StyledTableHeaderCell>Action</StyledTableHeaderCell>
              </TableRow>
            </TableHead>

            {templatesData && templatesData?.length > 0 ? (
              <>
                <TableBody>
                  {templatesData &&
                    templatesData?.map((templateData, index) => (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {" "}
                          <Button onClick={() => handleOpenModal(templateData)}>
                            {" "}
                            {templateData?.reporttemplatename}{" "}
                          </Button>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {templateData?.reportname !== undefined &&
                          templateData?.reportname !== ""
                            ? templateData?.reportname
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {templateData?.reportinputfields?.selZoneName !==
                            undefined &&
                          templateData?.reportinputfields?.selZoneName !== ""
                            ? templateData?.reportinputfields?.selZoneName
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {templateData?.reportinputfields?.childZoneFlag !==
                            undefined &&
                          templateData?.reportinputfields?.childZoneFlag !== ""
                            ? templateData?.reportinputfields?.childZoneFlag
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          {templateData?.reportinputfields?.AllHierarchyFlag !==
                            undefined &&
                          templateData?.reportinputfields?.AllHierarchyFlag !==
                            ""
                            ? templateData?.reportinputfields?.AllHierarchyFlag
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                        {templateData?.reportinputfields?.selCustomerType !== undefined &&
                          templateData?.reportinputfields?.selCustomerType !== ""
                            ? templateData?.reportinputfields?.selCustomerType
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                        {templateData?.reportinputfields?.selCustomerTypeName !== undefined &&
                          templateData?.reportinputfields?.selCustomerTypeName !== ""
                            ? templateData?.reportinputfields?.selCustomerTypeName
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                        {templateData?.reportinputfields?.reportPeriodName !== undefined &&
                          templateData?.reportinputfields?.reportPeriodName !== ""
                            ? templateData?.reportinputfields?.reportPeriodName
                            : "-"}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell>
                          <Box display={"flex"} justifyContent={"center"}>
                            <IconButton
                              sx={{
                                width: "30px",
                                height: "30px",
                                padding: "4px 5px",
                                borderRadius: "34px",
                                background: "#F7D5D5",
                              }}
                            >
                              <img src={allImgPaths.trash} alt="trash" />
                            </IconButton>
                          </Box>
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
        {templatesData && templatesData?.length > 0 && (
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
          onClose={() => setIsOpenInfoModal(!isOpenInfoModal)}
          aria-labelledby="add-more-item-info-title"
          aria-describedby="add-more-item-info-description"
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
            <Grid item xs={12} md={6}>
              <Stack
                sx={{
                  backgroundColor: "#428bca",
                  width: "100%",
                  height: "50px",
                  border: "1px solid #428bca",
                  padding: "40px",
                }}
              >
                <Typography
                  display={"flex"}
                  justifyContent={"center"}
                  whiteSpace={"nowrap"}
                >
                  view Report Email Template
                </Typography>
              </Stack>
              <Grid>
                <IconButton
                  sx={{ position: "absolute", right: "13px", top: "19px" }}
                  onClick={handleCloseModal}
                >
                  <img src={allImgPaths.close} alt="close" />
                </IconButton>
              </Grid>
              <TableContainer
                sx={{ overflowX: "hidden", padding: "24px" }}
                component={Paper}
                elevation={0}
              >
                <Grid item xs={12} md={6}>
                  <table style={tableStyle}>
                    <tbody>
                      <tr>
                        <th style={{ padding: "10px 5px 15px 0px" }}>
                          Report Name
                        </th>
                        <td>{templatesModalData?.reportname}</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "10px 5px 15px 0px" }}>
                          Template Name*
                        </th>
                        <td>{templatesModalData?.reporttemplatename}</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "10px 5px 15px 0px" }}>
                          Recipient Email Ids*
                        </th>
                        <td>{templatesModalData?.recipientemailid}</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "10px 5px 15px 0px" }}>
                          Subject*
                        </th>
                        <td>{templatesModalData?.emailsubject}</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "10px 5px 15px 0px" }}>
                          Mail Body*
                        </th>
                        <td>{templatesModalData?.mailbody}</td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              <Button onClick={() => setIsOpenInfoModal(!isOpenInfoModal)} variant="contained" sx={{display: "flex",justifyContent: "center", }}> Close</Button>   

              </TableContainer>
            </Grid>
          </Box>
        </Modal>
      </Stack>
    );
  };
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
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
        <EmailTemplatesTable />
      </Grid>
    </Grid>
  );
};

export default ViewEmailTemplates;
