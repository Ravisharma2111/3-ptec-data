import {
  PrimarySelect,
  SearchInput,
  CustomButton,
} from "../../../../../components";
  import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  TextareaAutosize,
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
import { useDispatch, useSelector } from "react-redux";
import { FetchCustomerReorder } from "../../../../../redux/actions/sales/order";
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

const CreatePurchaseRequisition = () => {
  const dispatch = useDispatch();

  const {
    customerList,
    isLoadingOrderInfo,
    searchItems,
    orderInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const [customerReorderItems, setCustomerReorderItems] = useState([]);
  const [totalBillingQty, setTotalBillingQty] = useState(0);


  const items = localStorage.getItem("apiToken");
  useEffect(() => {
    const FetchCustomerReorderItems = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          customerId: "59d35d2ee4b0c1f361b0dfa6",
        };
        const result = await dispatch(FetchCustomerReorder(payload));
        setCustomerReorderItems(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    FetchCustomerReorderItems();
  }, []);


  const ItemInfoTable = () => {
    const extractNumbers = (input) => {
      const firstTwoNumbers = input.match(/\d+/)?.[0]?.slice(0, 2);
      return firstTwoNumbers;
    };

    const calculateBillingQty = (reorderLevel, instockQty) => {
      return Math.max(0, reorderLevel - instockQty);
    };

    const calculateTotalBillingQty = () => {
      return customerReorderItems?.reduce(
        (sum, data) =>
          sum + calculateBillingQty(data.reorderlevel, data.instockqty),
        0
      );
    };

    useEffect(() => {
      setTotalBillingQty(calculateTotalBillingQty());
    }, [customerReorderItems]);

    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{ minWidth: 650, borderRadius: 100 }}
            aria-label="create-order-table"
          >
            <TableHead
              sx={{
                backgroundColor: "#D5E3F7",
                padding: "20px 5px !important",
              }}
            >
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell>SN No. </StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Code </StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Description</StyledTableHeaderCell>

                <StyledTableHeaderCell>HSN No</StyledTableHeaderCell>
                <StyledTableHeaderCell>Pkg Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>In Stock Qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Booked Qty</StyledTableHeaderCell>

                <StyledTableHeaderCell>InTransit Qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Re-Order Level</StyledTableHeaderCell>
                <StyledTableHeaderCell>
                  Billing Qty(Stock Norm)
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>Free Qty</StyledTableHeaderCell>

                <StyledTableHeaderCell>Disc %</StyledTableHeaderCell>
                <StyledTableHeaderCell>Spl Disc %</StyledTableHeaderCell>
                <StyledTableHeaderCell>Rate</StyledTableHeaderCell>
                <StyledTableHeaderCell> Amount </StyledTableHeaderCell>
                <StyledTableHeaderCell> </StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerReorderItems?.map((data, index) => {
                const BillingQty = calculateBillingQty(
                  data.reorderlevel,
                  data.instockqty
                );

                return (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.itemcode}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.itemname}</StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.itemdescription}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell>
                      {data.itemtaxfields["59d35c47e4b0c1f361b0d955"]?.taxcode}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.childpkgunit}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {Math.floor(data.instockqty)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>{data.bookedqty}</StyledTableBodyCell>

                    <StyledTableBodyCell>
                      {data.inTransitQty}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.reorderlevel}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {Math.floor(BillingQty)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.pkgunitrate}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.pkgunitrate}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {Math.floor(data.instockqty)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {data.oldpkgunitrate}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
                      {Math.floor(data.oldpkgunitrate * BillingQty)}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell>
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
                    </StyledTableBodyCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  const ItemTaxTable = () => {
    return (
      <Stack gap={1}>
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{ minWidth: 650, borderRadius: 100 }}
            aria-label="create-order-table"
          >
            <TableHead
              sx={{
                backgroundColor: "#D5E3F7",
                padding: "20px 5px !important",
              }}
            >
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                  Tax Names{" "}
                </StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                  Tax Percent
                </StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                  Item Net Amount
                </StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                  Tax Amount
                </StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {customerReorderItems?.itemtaxfields?.['59d35c47e4b0c1f361b0d955'] && (
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableBodyCell
                      sx={{ textAlign: "center", color: "#274593" }}
                    >
                      {" "}
                      {customerReorderItems.itemtaxfields['59d35c47e4b0c1f361b0d955'].taxname}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      sx={{ textAlign: "center", color: "#274593" }}
                    >
                      {" "}
                      {customerReorderItems.itemtaxfields['59d35c47e4b0c1f361b0d955'].taxpercent}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      sx={{ textAlign: "center", color: "#274593" }}
                    >
                      {" "}
                      449976.00{" "}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      sx={{ textAlign: "center", color: "#274593" }}
                    >
                      {" "}
                      80995.68{" "}
                    </StyledTableBodyCell>
                  </StyledTableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };
  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12}>
        <SearchInput />
      </Grid>
      <Grid item xs={12}>
        <ItemInfoTable />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          backgroundColor: "#F9F9F9",
          padding: "11px 15px",
          mt: "16px",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={6} textAlign={"right"}>
          <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
            Total Quantity: {Math.floor(totalBillingQty)}
          </Typography>
        </Grid>
        <Grid item xs={5} textAlign={"right"}>
          <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
            Total Amount: 841917.00
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ItemTaxTable />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          backgroundColor: "#F9F9F9",
          padding: "11px 15px",
          mt: "16px",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={11} textAlign={"right"}>
          <Typography color="#274593" fontWeight={"500"} fontSize={"14px"}>
            Total Tax Amount: 80995.68
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          backgroundColor: "#5CB75C",
          padding: "11px 15px",
          mt: "16px",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={11} textAlignc={"right"}>
          <Typography color="#FFFFFF" fontWeight={"500"} fontSize={"16px"}>
            Net Billing Amount:
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack overflow={"auto"} gap={"10px"}>
          <Typography> Add Comments</Typography>
          <TextareaAutosize
            className="comment-textarea"
            name={"comment"}
            type={"text"}
            placeholder={"write here"}
            minRows={4}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Stack>
          <CustomButton
            // onClick={handleCreateOrder}
            label="Create Purchase"
            sx={{
              textTransform: "capitalize",
              maxWidth: "320px",
              borderRadius: "38px",
              padding: "16px 49px",
              height: "51px",
              fontSize: "18px",
            }}
          />
          <Button
            sx={{ textTransform: "capitalize", fontSize: "18px", mt: 1 }}
            size="small"
          >
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CreatePurchaseRequisition;
