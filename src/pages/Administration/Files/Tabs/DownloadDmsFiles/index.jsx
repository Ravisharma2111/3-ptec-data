import React, { useEffect, useState } from "react";
import { Grid, Paper,Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses  } from "@mui/material";
import TemplateFile from "../../assets/files/TemplateCustomerCreate.csv";
import HelpFile from "../../assets/files/HelpFileCustomerCreate.csv";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SearchInput from "../../../../../components/SearchInput";
import { PrimarySelect } from "../../../../../components";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { FetchDMSDownloadFile } from "../../../../../redux/actions/sales/order";

const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "left",
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  border: `1px solid ${theme.palette.action.hover}`

}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#F0F0F0',
    color: "#274593",
    border: `1px solid #dddddd`, // Add border styling
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: `1px solid #dddddd`, // Add border styling
    textAlign: "center",
    fontWeight: "600",

  },
}));

const DownloadDmsFiles = () => {
  const dispatch = useDispatch();

  const [downloadSVCData, setDownloadSVCData] = useState(1);



  const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleItemMasterData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          servicetype:'FileDownloadService',
          fileDataSource: "TemplateCustomerCreate",
          singleFileFlag: false,
          entityId: '',
          reportInputFieldsData: '',

        };

        const result = await dispatch(FetchDMSDownloadFile(payload));
        setDownloadSVCData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleItemMasterData();
  }, [ items,]);
  // console.log("downloadSVCData", downloadSVCData);

  const downloadFile = async (fileType) => {
    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
        servicetype: 'FileDownloadService',
        fileDataSource: fileType,
        singleFileFlag: false,
        entityId: '',
        reportInputFieldsData: '',
      };

      const fileData = await dispatch(FetchDMSDownloadFile(payload));

      const blob = new Blob([fileData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileType}.csv`; // Specify the file name with the desired extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const ConfirmPurchaseTable = () => {

    const tableRows = [
  { label: 'Create Customers Template', fileType: 'TemplateCustomerCreate' },
  { label: 'Create Customers Help File', fileType: 'HelpFileCustomerCreate' },
  { label: 'Upload Opening Stocks Template', fileType: 'TemplateFreshStockUpdate' },
  { label: 'Upload Opening Stocks Help File', fileType: 'HelpFileFreshStockUpdate' },
  { label: 'Upload Fresh Item Infos Template', fileType: 'TemplateUploadItemInfo' },
  { label: 'Upload Fresh Items Info Help File', fileType: 'HelpFileUploadItemInfo' },
  { label: 'Update ReOrder Level Template', fileType: 'TemplateReorderLevelUpdate' },
  { label: 'Update ReOrder Level Help File', fileType: 'HelpFileReorderLevelUpdate' },
  { label: 'Upload Historical Invoices Template', fileType: 'TemplateCreateHistoricalInvoice' },
  { label: 'Upload Historical Invoices Help File', fileType: 'HelpFileCreateHistoricalInvoice' },
  { label: 'Upload Historical Stocks Template', fileType: 'TemplateUpdateHistoricalStock' },
  { label: 'Upload Historical Stocks Help File', fileType: 'HelpFileUpdateHistoricalStock' },
  { label: 'Upload Sales Person Beat Plan Template', fileType: 'TemplateUpdateSalesPersonBeatPlan' },
  { label: 'Upload Sales Person Beat Plan Help File', fileType: 'HelpFileUpdateSalesPersonBeatPlan' },
  // Add other rows similarly
];

    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableCell>Dms File Upload Templates</StyledTableCell>
                <StyledTableCell> Dms File Upload Sample Help Files</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "#D5E3F7",}}>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row"   sx={{ padding: "0px !important" }} >  <Button onClick={() => downloadFile('TemplateCustomerCreate')} >Create Customers Template </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button  onClick={() => downloadFile('HelpFileCustomerCreate')}>	Create Customers Help File </Button> </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }} > <Button onClick={() => downloadFile('TemplateFreshStockUpdate')} >Upload Opening Stocks Template    </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button onClick={() => downloadFile('HelpFileFreshStockUpdate')} >   	Create Customers Help File                    </Button></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }} > <Button onClick={() => downloadFile('TemplateUploadItemInfo')} >Upload Fresh Item Infos Template    </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button onClick={() => downloadFile('HelpFileUploadItemInfo')} >                  Upload Opening Stocks Help File     </Button></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }} > <Button onClick={() => downloadFile('TemplateReorderLevelUpdate')} >Update ReOrder Level Template   </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button onClick={() => downloadFile('HelpFileReorderLevelUpdate')} >               	Upload Fresh Items Info Help File        </Button></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }} > <Button onClick={() => downloadFile('TemplateCreateHistoricalInvoice')} >Upload Historical Invoices Template    </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button onClick={() => downloadFile('HelpFileCreateHistoricalInvoice')} >                  Update ReOrder Level Help File     </Button></StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }} > <Button onClick={() => downloadFile('TemplateUpdateHistoricalStock')} >Upload Historical Stocks Template   </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button  onClick={() => downloadFile('HelpFileUpdateHistoricalStock')} >           Upload Historical Invoices Help File            </Button></StyledTableCell>
              </StyledTableRow>

              <StyledTableRow >
                <StyledTableCell component="th" scope="row" sx={{ padding: "0px !important" }}  > <Button onClick={() => downloadFile('TemplateUpdateSalesPersonBeatPlan')} >Upload Sales Person Beat Plan Template    </Button></StyledTableCell>
                <StyledTableCell sx={{ padding: "0px !important" }} >  <Button  onClick={() => downloadFile('HelpFileUpdateSalesPersonBeatPlan')}>             	Upload Sales Person Beat Plan Help File          </Button></StyledTableCell>
              </StyledTableRow>
            </TableBody>
           
          </Table>
        </TableContainer>
      </Stack>
    );
  };
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12}>
        <ConfirmPurchaseTable />
      </Grid>
    </Grid>
  );
};

export default DownloadDmsFiles;
