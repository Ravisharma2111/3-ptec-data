import React, { useEffect, useState } from "react";
import { Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchAdminEntityProfile } from "../../../../../redux/actions/sales/order";
const StyledTableHeaderCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "left",
  fontWeight: "bold",
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
const OrgProfile = () => {
  const dispatch = useDispatch();
  const [orgProfileData, setOrgProfileData] = useState([]);

  const items = localStorage.getItem("apiToken");
  const UserName = localStorage.getItem("fname");
  const UserKey = localStorage.getItem("userid");

  useEffect(() => {
    const handleOrgPrfileData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
        };

        const result = await dispatch(FetchAdminEntityProfile(payload));
        setOrgProfileData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleOrgPrfileData();
  }, []);
  console.log("confirmPurchaseList", orgProfileData);

  console.log("confirmPurchaseList", UserName);

  const OrgProfileTable = () => {
    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
            {/* <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell>Dms File Upload Templates</StyledTableHeaderCell>
                <StyledTableHeaderCell> Dms File Upload Sample Help Files</StyledTableHeaderCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Entity Type Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.orgtypename }</StyledTableBodyCell>
                <StyledTableHeaderCell>Parent Entity Type Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.parenttypename }</StyledTableBodyCell>
              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Party Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.tenantname }</StyledTableBodyCell>
                <StyledTableHeaderCell>Party Key</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.tenantid }</StyledTableBodyCell>
              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Parent Entity Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.parentorgname }</StyledTableBodyCell>
                <StyledTableHeaderCell>Parent Entity Key</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.parentorgid }</StyledTableBodyCell>

              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Entity Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.orgname }</StyledTableBodyCell>

                <StyledTableHeaderCell>Entity Key</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.orgid }</StyledTableBodyCell>
              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Entity Zone Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.zonename }</StyledTableBodyCell>

                <StyledTableHeaderCell>Entity Zone Key</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.zoneid }</StyledTableBodyCell>

              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>User Name</StyledTableHeaderCell>
                <StyledTableBodyCell>{UserName}</StyledTableBodyCell>
                <StyledTableHeaderCell>Current User Key</StyledTableHeaderCell>
                <StyledTableBodyCell>{ UserKey }</StyledTableBodyCell>
              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Available Customer Types</StyledTableHeaderCell>
                <StyledTableBodyCell>{ orgProfileData?.CustomerTypeList }</StyledTableBodyCell>
                <StyledTableHeaderCell></StyledTableHeaderCell>
                <StyledTableBodyCell></StyledTableBodyCell>
              </StyledTableRow>
              <StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableHeaderCell>Service Token Key</StyledTableHeaderCell>
                <StyledTableBodyCell> Not yet created</StyledTableBodyCell>
                <StyledTableHeaderCell></StyledTableHeaderCell>
                <StyledTableBodyCell></StyledTableBodyCell>
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
        <OrgProfileTable />
      </Grid>
    </Grid>
  );
};

export default OrgProfile;
