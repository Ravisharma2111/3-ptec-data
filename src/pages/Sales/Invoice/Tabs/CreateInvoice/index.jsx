import { SecondarySelect } from "../../../../../components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormGroup, Grid, IconButton, Modal, Stack, TextField, Typography, outlinedInputClasses } from "@mui/material";
import { CustomButton, CustomCheckBox, SearchBox, SearchInput,CustomRadioGroup } from "../../../../../components";
import { get, size } from "lodash";
// import allImgPaths from "../../../../assets/images/allImgPaths";
import { fetchCustomerList, fetchItemDetails, fetchSearchItems } from "../../../../../redux/actions/sales/order";
import useDebounce from "../../../../../hooks/useDebounce";

const SearchDataSource = "createSalesOrder";

const RadioButtonList = [
  { value: "directInvoice", label: "Direct Invoice" },
  { value: "invoiceAganistOrders", label: "Invoice Against Orders(s)" },
];

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const { entitytypeaccess, allhierarchyflag = false } = useSelector(({ auth }) => auth);
  const { customerList, isLoadingSearchItems, searchItems, itemInfo, isLoadingItemInfo } = useSelector(({ order }) => order);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [customerType, setCustomerType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerListData, setCustomerListData] = useState('');
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedRadio, setSelectedRadio] = useState(RadioButtonList[1].value);
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
    if (customerType) {
      const payload = {
        childZoneFlag: true,
        selZoneIds: "",
        selCustomerTypes: customerType,
        allhierarchyflag,
      };
      getCustomersList(payload);
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



  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
    <Grid item xs={12} md={6}>
    <SecondarySelect
      label="Customer Type"
      id="customer-type-select"
      options={getOptionsForCustomerType()}
      value={customerType}
      onChange={(e) => {setCustomerType(e.target.value);  setCustomerName('');   setIsSearchBoxVisible(false);}}
    />
  </Grid>
  <Grid item xs={12} md={6}>
  <SecondarySelect
    label="Customer Name"
    id="customer-name-select"
    value={customerName}
    options={getOptionsForCustomerList(customerList)}
    onChange={(e) => {setCustomerName(e.target.value);  setIsSearchBoxVisible(true)}}
  />
</Grid>
{isSearchBoxVisible && (
  <Grid item xs={12} style={{width:'80px'}} >
  <CustomRadioGroup value={selectedRadio} onChange={(e, value) => setSelectedRadio(value)} list={RadioButtonList} name="custom-radio-class" />
</Grid>
)}

{ !isSearchBoxVisible ? (
  <Grid item xs={12} sm={7} md={9}>
  <SecondarySelect label="Route Name" id="route-name-select" />
</Grid> ):(
  <Grid item xs={12} sm={7} md={9}>
{selectedRadio === "directInvoice" && (
  <Grid item xs={12}>
  <Grid item xs={12} sm={7} md={9}>
  <SecondarySelect label="Route Name" id="route-name-select" />
</Grid>
<Grid item xs={12} sm={7} md={9}>
<Typography mb={"10px"}>Search Item</Typography>
<SearchBox
label="Customer Name"
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
</Grid>
  </Grid>
)}
{selectedRadio === "invoiceAganistOrders" && (
  <Grid item xs={12} md={6}>
    <SecondarySelect
      label="Select Order"
      id="customer-name-select"
      // value={customerName}
      // options={getOptionsForCustomerList(customerList)}
      onChange={(e) => setCustomerName(e.target.value)}
    />
  </Grid>
)}
</Grid>
)}


       
     
    </Grid>
  );
};

export default CreateInvoice;
