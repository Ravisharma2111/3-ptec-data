import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography, outlinedInputClasses } from "@mui/material";
import { CustomButton, CustomCheckBox, SearchBox, SearchInput, SecondarySelect } from "../../../../components";
import { get, size } from "lodash";
import allImgPaths from "../../../../assets/images/allImgPaths";
import { fetchCustomerList, fetchItemDetails, fetchSearchItems,postCreateOrderData } from "../../../../redux/actions/sales/order";
import useDebounce from "../../../../hooks/useDebounce";

const SearchDataSource = "createSalesOrder";

const CustomInput = ({ name, placeholder = "write here", label = "" }) => {
  return (
    <Stack gap={"10px"} mx={"30px"}>
      <Typography color={"#274593"} fontWeight={500}>
        {label}
      </Typography>
      <TextField
        fullWidth
        sx={{
          backgroundColor: "rgba(85, 126, 255, 0.05)",
          borderRadius: "10px",

          "& .MuiOutlinedInput-input": {
            zIndex: 1,
          },
          [`& .${outlinedInputClasses.root}`]: {
            height: "46px",
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            border: "1px solid #557EFF",
            borderRadius: "10px",
            backgroundColor: "rgba(85, 126, 255, 0.05)",
          },
        }}
        name={name}
        placeholder={placeholder}
      />
    </Stack>
  );
};

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { entitytypeaccess, allhierarchyflag = false } = useSelector(({ auth }) => auth);
  const { customerList, isLoadingSearchItems, searchItems, itemInfo, isLoadingItemInfo } = useSelector(({ order }) => order);
  console.log('searchItems',searchItems)

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerListData, setCustomerListData] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getOptionsForCustomerType = () => {
    let options = [];
    Object.keys(entitytypeaccess).forEach((key) => {
      options.push({ label: entitytypeaccess[key], value: key });
    });
    return options;
  };

  const getSearchItems = (payload) => {
    try {
      dispatch(fetchSearchItems(payload));
    } catch (error) {
      console.log("error getSearchItems=>", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      let payload = {};
      payload.searchDataSource = SearchDataSource;
      payload.searchText = debouncedSearchTerm;
      getSearchItems(payload);
    }
  }, [debouncedSearchTerm]);

  const getOptionsForCustomerList = (list) => {
    console.log('list listlist',list)
    let options = [];
    if (size(list)) {
      list.forEach(({ name, orgid }) => {
        options.push({ label: name, value: orgid });
      });
    }
    return options;
  };

  

  const getCustomersList = async (payload) => {
    try {
      const result = await dispatch(fetchCustomerList(payload));
      setCustomerListData(result)
    } catch (error) {
      console.log("error getCustomersList", error);
    }
  };
  useEffect(() => {
    getCustomersList({
      childZoneFlag: true,
      selZoneIds: "",
      selCustomerTypes: "",
      allhierarchyflag,
    });
  }, []);

  useEffect(() => {
    if (customerType) {
      const payload = {
        childZoneFlag: true,
        selZoneIds: "",
        selCustomerTypes: customerType,
        allhierarchyflag,
      };
      getCustomersList(payload);
      setCustomerName(customerType);

    }
  }, [customerType]);

  useEffect(() => {
    if (selectedItem) {
      let payload = {};
      payload.formAction = SearchDataSource;
      payload.itemCode = get(selectedItem, "value", "");
      dispatch(fetchItemDetails(payload));
    }
  }, [selectedItem]);

  const ItemInfoModal = () => {
    return (
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
            width: { xs: "90%", md: "617px" },
            bgcolor: "#FFF",
            borderRadius: "20px",
            boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.10)",
            padding: "24px 24px 16px 24px",
          }}
        >
          <Stack gap={3}>
            <Typography id="add-more-item-info-title" color={"primary"} textAlign={"center"} fontSize={"25px"} fontWeight={"600"}>
              Add more items
            </Typography>
            <CustomInput label="Item Code" name={"itemCode"} />
            <CustomInput label="Item Name" name={"itemName"} />
            <CustomInput label="Item Description" name={"itemDescription"} />

            <Stack alignItems={"center"}>
              <CustomButton
                fullWidth={false}
                label="Add more Item"
                sx={{ textTransform: "capitalize", borderRadius: "38px", padding: "16px 49px", height: "51px" }}
              />
            </Stack>

            <IconButton
              sx={{
                position: "absolute",
                right: "13px",
                top: "19px",
                padding: "10px",
                borderRadius: "100px",
                backgroundColor: "#F1F1F1",
                color: "red",
              }}
              onClick={() => setIsOpenInfoModal(!isOpenInfoModal)}
            >
              <img src={allImgPaths.closeBlack} alt="close" height={24} />
            </IconButton>
          </Stack>
        </Box>
      </Modal>
    );
  };

  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Customer Type"
          id="customer-type-select"
          options={getOptionsForCustomerType()}
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SecondarySelect
          label="Customer Name"
          id="customer-name-select"
          value={customerName}
          options={getOptionsForCustomerList(customerListData)}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Grid>
      <Grid container item xs={12} columnSpacing={"15px"} alignItems={"end"} rowSpacing={"15px"}>
        <Grid item xs={12} sm={7} md={9}>
          <SecondarySelect fullWidth label="Route Name" id="route-name-select" />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <FormGroup>
            <CustomCheckBox
              label="Failed Visit"
              id="failed-visit-checkbox"
              sx={{
                width: "100%",
                m: 0,
                height: "46px",
                justifyContent: "center",
              }}
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography mb={"10px"}>Search & Add Items to Order List</Typography>
        <Stack gap={"16px"} direction={"row"} alignItems={"center"}>
          <SearchBox
          
            hideIcon
            loading={isLoadingSearchItems}
            searchValue={searchTerm}
            optionValue={selectedItem}
            open={isOpenSearchList}
            onOpen={() => setIsOpenSearchList(true)}
            onClose={() => setIsOpenSearchList(false)}
            onChange={(event, newValue) => {
              setSelectedItem(newValue);
            }}
            options={searchItems}
            onSearchChange={(event, newValue) => setSearchTerm(newValue)}
          />
          <Button
            sx={{
              minWidth: "150px",
              height: "46px",
              borderRadius: "10px",
              border: "1px solid #0176D3",
              background: "#E4F3FF",
              textTransform: "initial",
            }}
            variant="outlined"
            onClick={() => setIsOpen(!isOpen)}
          >
            Add more Item
          </Button>
          <IconButton>
            <img alt="info" height={24} width={24} src={allImgPaths.infoCircle} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <CustomButton
          label="Submit"
         
          sx={{ textTransform: "capitalize", maxWidth: "174px", borderRadius: "38px", padding: "16px 49px", height: "51px" }}
        />
      </Grid>
      <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)} aria-labelledby="add-more-item-title" aria-describedby="add-more-item-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "617px" },
            bgcolor: "#FFF",
            borderRadius: "20px",
            boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.10)",
            padding: "24px 24px 16px 24px",
          }}
        >
          <Stack gap={3}>
            <Typography id="add-more-item-title" color={"primary"} textAlign={"center"} fontSize={"25px"} fontWeight={"600"}>
              Add more items
            </Typography>
            <Stack gap={"10px"}>
              <Typography>Search & Add Items to Order List</Typography>
              <SearchInput hideIcon />
            </Stack>
            <Stack alignItems={"center"}>
              <CustomButton
                fullWidth={false}
                label="Add more Item"
                onClick={() => setIsOpenInfoModal(!isOpenInfoModal)}
                sx={{ textTransform: "capitalize", borderRadius: "38px", padding: "16px 49px", height: "51px" }}
              />
            </Stack>

            <IconButton sx={{ position: "absolute", right: "13px", top: "19px" }} onClick={() => setIsOpen(!isOpen)}>
              <img src={allImgPaths.close} alt="close" />
            </IconButton>
          </Stack>
        </Box>
      </Modal>
      <ItemInfoModal />
    </Grid>
  );
};

export default CreateOrder;
