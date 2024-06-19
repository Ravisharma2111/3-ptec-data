import React, { useEffect, useState } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Input,
  InputLabel,
} from "@mui/material";
import SecondarySelect from "../../../../../components/SecondarySelect";
import { CustomRadioGroup } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { FetchDMSUploadFile } from "../../../../../redux/actions/sales/order";

const UploadOptions = [
  {
    label: "Upload New Customers",
    value: "customer-create",
  },
  {
    label: "Update Opening Stocks",
    value: "openingstock-update",
  },
  {
    label: "Upload Fresh Item Infos",
    value: "iteminfo-create",
  },
  {
    label: "Update Reorder Level",
    value: "reorder-level-update",
  },
  {
    label: "Upload Historical Invoices",
    value: "historical-invoice-create",
  },
  {
    label: "Upload Historical Stocks",
    value: "historical-stock-update",
  },
  {
    label: "Upload Image",
    value: "upload-image",
  },
  {
    label: "Upload Sales Person Beat Plan",
    value: "salesperson-beat-plan-create",
  },
];

const RadioButtonList = [
  { value: "productLaunchImage", label: "Product Launch Image" },
  { value: "customerComplaintImage", label: "Customer Complaint Image" },
  { value: "invoiceRelatedIssueImage", label: "Invoice Related Issue Image" },
];

const RadioLabelSX = {
  borderRadius: "8px",
  backgroundColor: "#f2f2f5",
  padding: "10px 15px",
  height: "40px",
  marginLeft: 0,
  marginRight: 0,
  border: "1px solid #0176D3",
  width: "100%",
  minWidth: "280px",
  "& span": {
    color: "#828282",
  },
};
const LabelSelectedSX = {
  borderRadius: "8px",
  backgroundColor: "#E4F3FF",
  padding: "10px 15px",
  height: "40px",
  marginLeft: 0,
  marginRight: 0,
  border: "1px solid #0176D3",
  width: "100%",
  minWidth: "280px",
  "& span": {
    color: "#0176D3",
  },
};

const UploadDmsFiles = () => {
  const dispatch = useDispatch();
  // const [selectOption, setSelectOption] = useState(UploadOptions[0].value);
  // const [value, setValue] = useState("upload-image"); // Set default value
  const [selectedRadio, setSelectedRadio] = useState(RadioButtonList[0].value);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(UploadOptions[0]);

  const [uploadFiles, setUploadFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("fileees", file);
    setSelectedFile(file);
  };

  const handleChangeValue = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = UploadOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedOption);
    console.log("Selected option:", selectedOption);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const items = localStorage.getItem("apiToken");

  const handleUploadCustomerFile = async () => {
    try {
      console.log("uploadFiles", uploadFiles);
      const imageDataSource =
        selectedOption?.value === "upload-image" ? "upload-image" : "";

      if (!selectedFile) {
        alert("Please select a file.");
        return;
      }

      // Check if the selected file is not a CSV
      if (selectedFile.type !== "text/csv") {
        alert("Please upload a CSV file.");
        return;
      }

      // Additional check for image file if the option is "upload-image"
      if (imageDataSource === "upload-image") {
        // Check if the selected file is an image
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedImageTypes.includes(selectedFile.type)) {
          // Show an alert if the file is not an image
          alert("Please upload an image file for 'upload-image' option.");
          return;
        }
      }

      console.log("imageDataSource", imageDataSource);
      const fileData = selectedOption?.value;

      console.log("selectedFile", selectedFile);
      const formData = new FormData();
      console.log("formData", formData);
      formData.append("file", selectedFile);

      const payload = {
        apiToken: localStorage.getItem("apiToken"),
        txnSource: "Application",
        imageDataSource: imageDataSource,
        fileDataSource: fileData,
      };

      const result = await dispatch(FetchDMSUploadFile(payload));
      setUploadFile(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
    console.log("selectedRadio", selectedRadio);
    console.log("selectedFile", selectedFile);
  };
  console.log("object121212", uploadFiles);

  return (
    <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={"10px"}
          flexWrap={"wrap"}
        >
          <Button variant="outlined" component="label">
            {selectedFile ? "File Selected" : "Upload File"}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          <Button variant="outlined" onClick={handleUploadCustomerFile}>
            {selectedOption?.label || "Upload New Customers"}
          </Button>
          {/* {selectedFile && ( */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRemoveFile}
              disabled={!selectedFile}
            >
              Clear
            </Button>
          {/* )} */}
        </Stack>
      </Grid>
      {selectedOption.value === "upload-image" && (
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <RadioGroup
            row
            name={"custom-type"}
            value={selectedRadio}
            onChange={(e, value) => setSelectedRadio(value)}
          >
            <Stack
              direction={{ xs: "row" }}
              display={"flex"}
              gap={"15px"}
              flexWrap={{ md: "nowrap" }}
            >
              {Object.keys(RadioButtonList).map((_radio, index) => (
                <FormControlLabel
                  key={index}
                  sx={
                    selectedRadio === RadioButtonList[_radio].value
                      ? LabelSelectedSX
                      : RadioLabelSX
                  }
                  value={RadioButtonList[_radio].value}
                  control={<Radio disableRipple sx={{ pl: 0 }} />}
                  label={RadioButtonList[_radio].label}
                />
              ))}
            </Stack>
          </RadioGroup>
        </Grid>
      )}

      <Grid
        sx={{
          color: "red",
          width: "65%",
          fontWeight: "600",
          margin: "auto",
          marginTop: "35px",
        }}
      >
        {uploadFiles}
      </Grid>

      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <SecondarySelect
          options={UploadOptions}
          value={selectedOption.value}
          sx={{ minWidth: "280px" }}
          onChange={(e) => handleChangeValue(e)}
        />
      </Grid>
    </Grid>
  );
};

export default UploadDmsFiles;
