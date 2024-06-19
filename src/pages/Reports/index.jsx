import React, { useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Breadcrumbs,
  FormGroup,
  Button,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Pagination,
  PaginationItem,
  styled,
  outlinedInputClasses,
  Box,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  CustomButton,
  CustomCard,
  CustomCheckBox,
  CustomDatePicker,
  CustomRadioGroup,
  PrimarySelect,
  SearchInput,
  SecondarySelect,
} from "../../components";
import allImgPaths from "../../assets/images/allImgPaths";
import { ItemPerPage } from "../../shared/constants";

const ReportPeriod = [
  { label: "Today", value: "today" },
  { label: "Previous Day", value: "previous_day" },
  { label: "Last 3 Days", value: "last_3_days" },
  { label: "Last 5 Days", value: "last_5_days" },
  { label: "Last Week", value: "last_week" },
  { label: "Current Month", value: "current_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 3 Months", value: "last_3_months" },
  { label: "Last Quarter", value: "last_quarter" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Custom", value: "custom" },
];

const SortBy = [
  { label: "Customer Name", value: "customer-name" },
  { label: "Customer Type", value: "customer-type" },
  { label: "Period", value: "period" },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F0F0F0",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9F9F9",
  },
}));

const RadioButtonList = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tritery", label: "Tritery" },
];

const Reports = () => {
  const [reportPeriod, setReportPeriod] = useState("today");
  const [selectedRadio, setSelectedRadio] = useState(RadioButtonList[0].value);

  const BreadCrumb = () => {
    return (
      <Breadcrumbs
        separator={<KeyboardArrowRight />}
        sx={{
          color: "#0176D3",
        }}
        aria-label="breadcrumb"
      >
        <Typography>Home Zone</Typography>
        <Typography>MP</Typography>
      </Breadcrumbs>
    );
  };

  const Header = () => {
    return (
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h4" fontSize={"28px"} fontWeight={"bold"}>
          Reports
        </Typography>

        <Stack direction={"row"} gap={"15px"} alignItems={"baseline"}>
          <div>
            <Typography variant="span" noWrap fontSize={12}>
              Report Period
            </Typography>
          </div>
          <PrimarySelect options={ReportPeriod} name={"report-period"} value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)} />
          {reportPeriod === "custom" && (
            <Stack direction={"row"} gap={"15px"} alignItems={"baseline"}>
              <CustomDatePicker />
              <Typography> to</Typography>
              <CustomDatePicker />
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  };

  const ReportBody = () => {
    return (
      <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
        <Grid item xs={12}>
          <SecondarySelect label="Select Zone" id="zone-select" required />
        </Grid>
        <Grid item xs={12}>
          <BreadCrumb />
        </Grid>
        <Grid item xs={12} md={6}>
          <SecondarySelect label="Customer Type" id="customer-type-select" />
        </Grid>
        <Grid item xs={12} md={6}>
          <SecondarySelect label="Customer Name" id="customer-name-select" />
        </Grid>
        <Grid item xs={12}>
          <SecondarySelect label="Item Group" id="item-group-select" />
        </Grid>
        <Grid item xs={12}>
          <FormGroup sx={{ ml: "12px" }}>
            <CustomCheckBox label="Select Item Attributes" id="select-attr-checkbox" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={"300"} fontSize={"16px"} mb={"10px"}>
            Display Item Cols
          </Typography>
          <Chip
            label="itemdescription"
            color="primary"
            variant="outlined"
            onDelete={() => {}}
            sx={{ color: "#848484", backgroundColor: "#E4F3FF", fontSize: "12px", mb: "10px" }}
            deleteIcon={<CancelOutlinedIcon />}
          />
          <SecondarySelect hideLabel label="Search" id="search-select" />
        </Grid>
        <Grid item xs={12}>
          <SecondarySelect label="Report Name" id="report-name-select" />
        </Grid>
        <Grid item xs={12}>
          <CustomRadioGroup value={selectedRadio} onChange={(e, value) => setSelectedRadio(value)} list={RadioButtonList} name="custom-radio-class" />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} ml={"12px"} gap={"15px"} flexWrap={"wrap"}>
            <CustomCheckBox label="Fetch in transit" id="fetch-in-transit" sx={{ backgroundColor: "#EEE", color: "#828282" }} />
            <CustomCheckBox label="Fetch Failed Invoices" id="fetch-failed-invoices" sx={{ backgroundColor: "#EEE", color: "#828282" }} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack display={"flex"} alignItems={"center"} gap={"16px"} pt={"15px"}>
            <CustomButton
              label="View Reports"
              sx={{ textTransform: "capitalize", maxWidth: "466px", borderRadius: "38px", padding: "16px 49px", height: "51px" }}
            />
            <Button sx={{ textTransform: "capitalize" }}>Save Report As Email Template</Button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const ReportTableHeader = () => {
    return (
      <Grid container rowSpacing={2} columnSpacing={1}>
        <Grid item xs={12} md={6}>
          <SearchInput />
        </Grid>
        <Grid item xs={12} md={6}>
          <PrimarySelect
            options={SortBy}
            name={"sort-by"}
            defaultLabel="Sort By"
            size="medium"
            onChange={() => {}}
            sx={{
              "&.MuiOutlinedInput-root": {
                height: "46px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={"8px"} height={{ xs: "auto", sm: "56px" }} flexWrap={"wrap"} justifyContent={{ xs: "start", md: "end" }}>
            <button
              style={{
                borderRadius: "10px",
                background: "#0176D3",
                color: "#fff",
                display: "flex",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                height: "46px",
                flexShrink: "0",
                cursor: "pointer",
              }}
            >
              Export XLS
              <img src={allImgPaths.xls} alt="xls" />
            </button>
            <button
              style={{
                borderRadius: "10px",
                background: "#0176D3",
                color: "#fff",
                display: "flex",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                flexShrink: "0",
                height: "46px",
                cursor: "pointer",
              }}
            >
              Export PDF
              <img src={allImgPaths.pdf} alt="pdf" />
            </button>
            <button
              style={{
                textTransform: "capitalize",
                borderRadius: "10px",
                border: "1px solid rgb(2, 106, 0)",
                background: "rgb(207, 255, 218)",
                color: "rgb(2, 106, 0)",
                minWidth: "130px",
                display: "flex",
                padding: "10px 15px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "46px",
                cursor: "pointer",
              }}
            >
              Email Report
              <img src={allImgPaths.email} alt={"email"} />
            </button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  function createData(date, tName, reportName, reportZone, allChild, allHirearchy, customerType, customerName, reportPeriod) {
    return { date, tName, reportName, reportZone, allChild, allHirearchy, customerType, customerName, reportPeriod };
  }

  const rows = [
    createData(1, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(2, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(3, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(4, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(5, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(6, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
    createData(7, "Sales to child", "Sales Report detailed", "MP", "True", "True", "Distributor", "All", "User_defined"),
  ];

  const ReportTable = () => {
    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <TableCell sx={{ color: "#274593" }}>Date</TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Template Name
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Report name
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Report Zone
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  All Child Zone
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  All Hirearchy
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Customer Type
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Customer name
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Report Period
                </TableCell>
                <TableCell align="right" sx={{ color: "#274593" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ date, tName, reportName, reportZone, allChild, allHirearchy, customerType, customerName, reportPeriod }, index) => (
                <StyledTableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {date}
                  </TableCell>
                  <TableCell align="right">{tName}</TableCell>
                  <TableCell align="right">{reportName}</TableCell>
                  <TableCell align="right">{reportZone}</TableCell>
                  <TableCell align="right">{allChild}</TableCell>
                  <TableCell align="right">{allHirearchy}</TableCell>
                  <TableCell align="right">{customerType}</TableCell>
                  <TableCell align="right">{customerName}</TableCell>
                  <TableCell align="right">{reportPeriod}</TableCell>
                  <TableCell>
                    <Box display={"flex"} justifyContent={"center"}>
                      <img
                        src={allImgPaths.trash}
                        alt="trash"
                        style={{
                          display: "flex",
                          width: "30px",
                          height: "30px",
                          padding: "4px 5px",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "34px",
                          background: "#F7D5D5",
                          gap: "10px",
                          flexShrink: "0",
                        }}
                      />
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Stack gap={"36px"}>
            <CustomCard>
              <Header />
              <ReportBody />
            </CustomCard>
            <CustomCard>
              <ReportTableHeader />
              <ReportTable />
              <Stack direction={"row"} alignItems={"center"}>
                <Typography whiteSpace={"nowrap"}>Items per page:&nbsp;</Typography>
                <PrimarySelect
                  options={ItemPerPage}
                  name={"items-per-page"}
                  value={10}
                  onChange={() => {}}
                  sx={{
                    backgroundColor: "transaprent",
                    borderColor: "#CACACA",
                    color: "#121212",
                    [`& .${outlinedInputClasses.notchedOutline}`]: { border: "1px solid #CACACA" },
                    ".MuiSvgIcon-root ": {
                      color: "#848484",
                    },
                  }}
                  fullWidth={false}
                />
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
                  count={10}
                  renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
                />
              </Stack>
            </CustomCard>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reports;
