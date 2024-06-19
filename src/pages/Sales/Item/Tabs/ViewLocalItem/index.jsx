import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid,
  Pagination,
  PaginationItem,
  Box ,
  Paper,
  Stack,
  Table,
  TableBody,
  Button, Modal, Backdrop, Fade,
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
// import SecondarySelect from "../../../../../components/SecondarySelect";
import { ItemPerPage } from "../../../../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { FetchMappedStockItemsService,FetchPendingItemData,FetchMatchingItem,FetchItemMappingData,FetchMappingScheduleFlag } from "../../../../../redux/actions/sales/order";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const StyledModal = styled(Modal)`
  position: absolute;
  top: 10%;
  left: 10%;
  paddingTop: '10px';
  overflow: scroll;
  height: 80% ;
  display: block;
`;
const MappingStatus = [
  { label: "Pending", value: "pending" },
  { label: "Mapped", value: "Mapped" },
];
const ViewLocalItem = () => {
  const dispatch = useDispatch();
  const { entitytypeaccess, allhierarchyflag = false } = useSelector(
    ({ auth }) => auth
  );

  const {
    customerList,
    isLoadingOrderInfo,
    searchItems,
    orderInfo,
    isLoadingItemInfo,
  } = useSelector(({ order }) => order);

  const [allMappingData, setAllMappingData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [mappingStatusType, setMappingStatusType] = useState("Pending");
  const [pendingData, setPendingData] = useState([]);
  const [matchingItem, setMatchingItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [disEna, setDisEna] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [filteredItemState, setFilteredItemsState] = useState([]);


  const handleFetchStocksService = async () => {
    setButtonClicked(true);
    try {
      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        entityId: "",
        mappingStatus: mappingStatusType,
      };
      const result = await dispatch(FetchMappedStockItemsService(payload));
      setAllMappingData(result);
    } catch (error) {
      console.error("Error fetching Mapped Stock Items:", error);
    }
  };
  useEffect(() => {
    if (buttonClicked || mappingStatusType === "Mapped") {
      handleFetchStocksService();
    }
  }, [mappingStatusType, buttonClicked]);

  const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleFetchpendingItem = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
        };
        const result = await dispatch(FetchPendingItemData(payload));
        console.log('result result',result)
        setPendingData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleFetchpendingItem();
  }, [items]);

  useEffect(() => {
    const handleFetchMatchingItem = async () => {
      try {
        const payload = {
          apiToken: localStorage.getItem("apiToken"),
          txnSource: "Application",
          itemSearchFlag: true,
        };
        console.log('payload',payload)
        const result = await dispatch(FetchMatchingItem(payload));
        console.log('result result',result)
        setMatchingItem(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleFetchMatchingItem();
  }, []);

  console.log("allMappingData", allMappingData);
  console.log("pendingData", pendingData);
  console.log("matchingItem", matchingItem);

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = event.target.value;
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1)
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const totalEntries = allMappingData?.length;
const startIndex = (currentPage - 1) * itemsPerPage + 1;
const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentOrderData = allMappingData?.slice(indexOfFirstItem, indexOfLastItem);

const handleOpen = (uniqueitemkey) => {
  if (typeof matchingItem === 'object' && matchingItem !== null) {
    const matchedKey = Object.keys(matchingItem).find(key =>
      key.toLowerCase().includes(uniqueitemkey.toLowerCase())
    );

    if (matchedKey) {
      const matchedArray = matchingItem[matchedKey];
      setFilteredItemsState(matchedArray);
      setOpen(true);
      return;
    }
  } else {
    console.error('matchingItem is not an object');
  }
};

console.log('filteredItemState',filteredItemState);

const handleClose = () => {
  setOpen(false);
};


const handleToggleButton = async () => {
  try {
    const payload = {
      apiToken: localStorage.getItem("apiToken"),
      txnSource: "Application",
      schedulerFlag : false
    };
    const result = await dispatch(FetchMappingScheduleFlag(payload));
    console.log('result item mapping',result)
  setDisEna(!disEna);

  } catch (error) {
    console.error("Error fetching OrderList:", error);
  }
};

const handleCreateItemMapping = async  () => {
  try {
    const payload = {
      apiToken: localStorage.getItem("apiToken"),
      txnSource: "Application",
      entityId : ""
    };
    const result = await dispatch(FetchItemMappingData(payload));
    console.log('result result',result)
  } catch (error) {
    console.error("Error fetching OrderList:", error);
  }
};

  const ItemMappingTable = () => {
    return (
      <Stack gap={1}>
      { allMappingData?.length > 0 ?
        (<>
          <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
              <TableRow sx={{ padding: "20px 5px !important" }}>
                <StyledTableHeaderCell>Sl.No.</StyledTableHeaderCell>
                <StyledTableHeaderCell>Local Item Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Local Item Other Info</StyledTableHeaderCell>
                <StyledTableHeaderCell>Local Pkg Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Description</StyledTableHeaderCell>
                <StyledTableHeaderCell>Accuracy</StyledTableHeaderCell>
                <StyledTableHeaderCell>Count</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item Code</StyledTableHeaderCell>
                <StyledTableHeaderCell>Pkg Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>Child Pkg Unit</StyledTableHeaderCell>
                <StyledTableHeaderCell>Child Pkg qty</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item SKU Flag</StyledTableHeaderCell>
                <StyledTableHeaderCell>Item SKU Code</StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                <StyledTableHeaderCell>#</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrderData?.map( (data, index) => (
                  <StyledTableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <StyledTableBodyCell>{startIndex + index}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.localitemname}</StyledTableBodyCell>
                    <StyledTableBodyCell>  {data.localitemotherinfo !== undefined &&
                          data.localitemotherinfo !== ""
                            ? data.localitemotherinfo
                            : "-"} </StyledTableBodyCell>
                    <StyledTableBodyCell>{data.localpkgunit}</StyledTableBodyCell>
                    <StyledTableBodyCell><Button onClick={()=>handleOpen(data.uniqueitemkey)}> {data.itemdescription !== undefined &&
                          data.itemdescription !== ""
                            ? data.itemdescription
                            : "-"}   </Button></StyledTableBodyCell>
                    <StyledTableBodyCell>{data.itemcode !== undefined &&
                          data.itemcode !== ""
                            ? data.itemcode
                            : "-"}</StyledTableBodyCell>
                    <StyledTableBodyCell> 96 %</StyledTableBodyCell>
                    <StyledTableBodyCell> 50 </StyledTableBodyCell>
                    <StyledTableBodyCell>{data.localpkgunit}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.childpkgunit !== undefined &&
                          data.childpkgunit !== ""
                            ? data.childpkgunit
                            : "-"}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.childpkgqty !== undefined &&
                          data.childpkgqty !== ""
                            ? data.childpkgqty
                            : "-"}</StyledTableBodyCell>
                    <StyledTableBodyCell>{data.itemskuflag !== undefined &&
                          data.itemskuflag !== ""
                            ? data.itemskuflag
                            : "-"}</StyledTableBodyCell>
                    <StyledTableBodyCell> {data?.itemskucode !== undefined &&
                          data?.itemskucode !== ""
                            ? data?.itemskucode
                            : "-"}  </StyledTableBodyCell>
                    <StyledTableBodyCell>{data.txnstatus}</StyledTableBodyCell>
                    <StyledTableBodyCell>
                      <Checkbox />
                    </StyledTableBodyCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
       
        <Stack direction={"row"} alignItems={"center"}>
        <Typography whiteSpace={"nowrap"}>Showing {startIndex} to {endIndex} of {totalEntries} entries &nbsp;</Typography>
         
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
            count={Math.ceil(totalEntries  / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => <PaginationItem slots={{ previous: ArrowBack, next: ArrowForward }} {...item} />}
          />
        </Stack>

        <Button variant="contained" onClick={handleCreateItemMapping}  >Contained</Button>

        </>
        )
        
        : ''}
        

        <StyledModal 
        open={open}
        onClose={handleClose}
        
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
          // timeout: 500,
        // }}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Fade in={open}>
        <Box sx={style}>
        <Button onClick={handleClose}>Close</Button>

        <Stack  sx={{ padding: "13px 0px 2px 26px" }}  direction={"row"} justifyContent={"space-between"}>
        
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
            [`& .${outlinedInputClasses.notchedOutline}`]: { border: "1px solid #CACACA" },
            ".MuiSvgIcon-root ": {
              color: "#848484",
            },
          }}
          fullWidth={false}
        />
       
        <Grid item xs={4}>
        <SecondarySelect
          label="Mapping Status"
          id="status-select-1"
          value={mappingStatusType}
          options={[
            { label: "Pending", value: "Pending" },
            { label: "Mapped", value: "Mapped" },
            
          ]}
          onChange={(e) => setMappingStatusType(e.target.value)}
        />
      </Grid>
      </Stack>
      <Grid item xs={6}>
        <SearchInput 
        // onSearch={handleSearch}
         />
      </Grid>
      
        <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
            <TableRow sx={{ padding: "20px 5px !important" }}>
              <StyledTableHeaderCell>Sl.No.</StyledTableHeaderCell>
              <StyledTableHeaderCell>Item code</StyledTableHeaderCell>
              <StyledTableHeaderCell>Item Description</StyledTableHeaderCell>
              <StyledTableHeaderCell>Pkg Unit</StyledTableHeaderCell>
              <StyledTableHeaderCell>Child Pkg Unit</StyledTableHeaderCell>
              <StyledTableHeaderCell>Item SKU Flag</StyledTableHeaderCell>
              <StyledTableHeaderCell>Item SKU Code</StyledTableHeaderCell>
              <StyledTableHeaderCell>Accuracy</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { filteredItemState.map((mappingData ,  index) =>(
          <StyledTableRow>
          <StyledTableHeaderCell>{ index + 1 }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.itemcode }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.itemdescription }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.pkgunit }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.childpkgunit }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.itemskuflag }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.itemskucode }</StyledTableHeaderCell>
          <StyledTableHeaderCell>{ mappingData.accuracy }</StyledTableHeaderCell>
                 
             </StyledTableRow>
             )) }
          </TableBody>
        </Table>
      </TableContainer>
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
            count={Math.ceil(totalEntries  / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => <PaginationItem slots={{ previous: ArrowBack, next: ArrowForward }} {...item} />}
          />
        </Stack>
      </Box>
        </Fade>
      </StyledModal>
      </Stack>
    );
  };

  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} sm={4} display={"flex"} alignItems={"center"}>
        <Typography>Item Mapping Pending: {pendingData?.pendingItemsCount}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          sx={{
            minWidth: "150px",
            height: "46px",
            borderRadius: "10px",
            border: "1px solid #0176D3",
            background: "#E4F3FF",
            textTransform: "initial",
          }}
          fullWidth
          variant="outlined"
          onClick={()=>handleFetchStocksService()}
        >
          Refresh Items
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          sx={{
            minWidth: "150px",
            height: "46px",
            borderRadius: "10px",
            border: "1px solid #0176D3",
            background: "#E4F3FF",
            textTransform: "initial",
          }}
          fullWidth
          variant="outlined"
          onClick={()=>handleFetchStocksService()}
        >
          Manual Item Mapping
        </Button>
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} gap={"15px"} alignItems={"center"}>
        <Stack display={"flex"} flexGrow={1}>
          <Typography whiteSpace={"nowrap"} mb={"10px"}>
            Schedule Auto Mapping
          </Typography>
         
            <Button
            sx={{
              minWidth: "150px",
              height: "46px",
              borderRadius: "10px",
              border: "1px solid #0176D3",
              background: "#E4F3FF",
              textTransform: "initial",
            }}
            fullWidth
            variant="outlined"
            onClick={handleToggleButton}
          >
          {disEna ? 'Enable' : 'Disable'}
          </Button>
          
         

         
         
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} gap={"25px"} alignItems={"center"}>
        <Stack  flexGrow={1}>
        <Grid item xs={12}  md={6}>
          <SecondarySelect
            label="Mapping Status"
            id="status-select-1"
            value={mappingStatusType}
            options={[
              { label: "Pending", value: "Pending" },
              { label: "Mapped", value: "Mapped" },
              
            ]}
            onChange={(e) => setMappingStatusType(e.target.value)}
          />
        </Grid>
        </Stack>
      </Grid>
      <Stack sx={{ padding: "13px 0px 2px 26px" }} direction={"row"} alignItems={"center"}>
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
          [`& .${outlinedInputClasses.notchedOutline}`]: { border: "1px solid #CACACA" },
          ".MuiSvgIcon-root ": {
            color: "#848484",
          },
        }}
        fullWidth={false}
      />
    </Stack>
      <Grid item xs={12}>
        <ItemMappingTable />
      </Grid>
    </Grid>
  );
};

export default ViewLocalItem;
