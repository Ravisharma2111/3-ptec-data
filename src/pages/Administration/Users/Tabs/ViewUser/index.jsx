



import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Paper,
  Button,
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
import allImgPaths from "../../../../../assets/images/allImgPaths";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAdminUsers,
  FetchAdminEditUsers,
  handleAdminUsersAviavlibilty,
  FetchAdminHierarchyData,
  DeleteAdminUsers,
} from "../../../../../redux/actions/sales/order";
import {
  CustomButton,
  CustomCheckBox,
  SecondarySelect,
  TextBox,
  PrimarySelect,
  SearchInput,
} from "../../../../../components";

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

const buttonSx = {
  "& .MuiOutlinedInput-input": {
    zIndex: 1,
  },
  [`& .${outlinedInputClasses.root}`]: {
    height: "46px",
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#F0F0F0",
  },
};

const ViewUser = () => {
  const dispatch = useDispatch();
  const [viewUserData, setViewUserData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewEditData, setViewEditData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewHierarchyData, setViewHierarchyData] = useState([]);
  const [viewEditModal, setviewEditModal] = useState(false);
  const [checkUser, setCheckUser] = useState("");

  const [formData, setFormData] = useState({
    loginid: "",
    fname: "",
    mname: "",
    lname: "",
    password: "",
    userroles: {
      admin: "",
    },
    userprivileges: {},
    zoneid: "",
    servicetypeaccess: "",
    tenantid: "",
    createdate: "",
    createdby: "",
    updatedate: "",
    updatedby: "",
    status: "",
    type: "",
    txnsource: "",
    entitytypeaccess: {},
    allhierarchyflag: false,
    childzoneflag: false,
    functionalmodules: {
      mainModules: [],
      subModules: [],
      moduleFeatures: [],
    },
    dashboardreportaccess: {},
    entityreportaccess: {},
    featuresaccess: {
      browser: "",
      mobile: "",
      externalsystem: "",
    },
    functionalzones: {},
    mobilereportaccess: {},
  });

  const items = localStorage.getItem("apiToken");

  useEffect(() => {
    const handleViewUserData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
        };

        const result = await dispatch(FetchAdminUsers(payload));
        setViewUserData(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };

    handleViewUserData();
  }, [items]);

  console.log("viewUserData", viewUserData);

  const handleEditUserData = async (userData) => {
    try {
      const UserId = userData?._id?.$oid;
      const status = userData?.status;
      const payload = {
        apiToken: items,
        txnSource: "Application",
        status: status,
      };
      console.log("UserId", UserId);
      console.log("status", status);

      const result = await dispatch(FetchAdminEditUsers(UserId, payload));
      setViewEditData(result);
      setviewEditModal(true);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }

    try {
      const payload = {
        apiToken: items,
        txnSource: "Application",
      };

      const result = await dispatch(FetchAdminHierarchyData(payload));
      setViewHierarchyData(result);
    } catch (error) {
      console.error("Error fetching OrderList:", error);
    }
  };
  console.log("viewEditData", viewEditData);
  console.log("viewHierarchyData", viewHierarchyData);

  useEffect(() => {
    if (viewEditData) {
      const newData = {
        loginid: viewEditData.loginid || "",
        fname: viewEditData.fname || "",
        mname: viewEditData.mname || "",
        lname: viewEditData.lname || "",
        password: viewEditData.password || "",
        userroles: {
          admin: viewEditData.userroles?.admin || "",
        },
        userprivileges: viewEditData.userprivileges || {},
        zoneid: viewEditData.zoneid || "",
        servicetypeaccess: viewEditData.servicetypeaccess || "",
        tenantid: viewEditData.tenantid || "",
        createdate: viewEditData.createdate || "",
        createdby: viewEditData.createdby || "",
        updatedate: viewEditData.updatedate || "",
        updatedby: viewEditData.updatedby || "",
        status: viewEditData.status || "",
        type: viewEditData.type || "",
        txnsource: viewEditData.txnsource || "",
        entitytypeaccess: viewEditData.entitytypeaccess || {},
        allhierarchyflag: viewEditData.allhierarchyflag || false,
        childzoneflag: viewEditData.childzoneflag || false,
        functionalmodules: viewEditData.functionalmodules || {
          mainModules: [],
          subModules: [],
          moduleFeatures: [],
        },
        dashboardreportaccess: viewEditData.dashboardreportaccess || {},
        entityreportaccess: viewEditData.entityreportaccess || {},
        featuresaccess: viewEditData.featuresaccess || {
          browser: "",
          mobile: "",
          externalsystem: "",
        },
        functionalzones: viewEditData.functionalzones || {},
        mobilereportaccess: viewEditData.mobilereportaccess || {},
      };
      setFormData(newData);
    }
  }, [viewEditData]);
  console.log("formData", formData);

  const filteredData = viewUserData?.filter((data) =>
    Object.values(data).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDeleteData = async (userData) => {
    const userConfirmed = window.confirm("Are you sure you want to delete?");

    if (userConfirmed) {
      console.log("formData", "userData");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          apiToken: items,
          txnSource: "Application",
          newLoginId: formData?.loginid,
        };
        console.log("Fetching data for formData?.loginid:", formData?.loginid);
        const result = await dispatch(handleAdminUsersAviavlibilty(payload));
        setCheckUser(result);
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    };
      fetchData();
  }, [formData?.loginid]);

  const ViewUserTable = () => {
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
                <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Login Id</StyledTableHeaderCell>
                <StyledTableHeaderCell>Role</StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ textAlign: "center" }}>
                  Update/Delete
                </StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((userData, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableBodyCell>{userData?.fname !== undefined &&
                          userData?.fname !== ""
                            ? userData?.fname
                            : "-"}</StyledTableBodyCell>
                  <StyledTableBodyCell>{userData?.loginid !== undefined &&
                          userData?.loginid !== ""
                            ? userData?.loginid
                            : "-"}</StyledTableBodyCell>
                  <StyledTableBodyCell>
                  {userData?.userroles?.admin !== undefined &&
                          userData?.userroles?.admin !== ""
                            ? userData?.userroles?.admin
                            : "-"}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell>{userData?.status !== undefined &&
                          userData?.status !== ""
                            ? userData?.status
                            : "-"}</StyledTableBodyCell>
                  <StyledTableBodyCell>
                    {userData?.userroles?.admin !== undefined &&
                          userData?.userroles?.admin === "Admin"
                            ?
                       (<Box
                        display={"flex"}
                        justifyContent={"center"}
                        gap={"10px"}
                      >
                        <IconButton
                          onClick={() => handleEditUserData(userData)}
                          sx={{
                            width: "30px",
                            height: "30px",
                            padding: "4px 5px",
                            borderRadius: "34px",
                            background: "#D5E3F7",
                          }}
                        >
                          <img src={allImgPaths.edit} alt="edit" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteData(userData)}
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
                    ) : "-"}
                  </StyledTableBodyCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
          />
        </Stack>
      </Stack>
    );
  };
  const ViewUserEditTable = () => {
    console.log(
      "Data deleted successfully!",
      formData?.featuresaccess?.browser === "Browser"
    );
    return (
      <Stack gap={1}>
        <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
          <Grid item xs={12} sm={6}>
            <TextBox
              label="Login Id*"
              placeholder="Login Id"
              sx={buttonSx}
              required
              value={formData.loginid}
              onChange={(e) =>
                setFormData({ ...formData, loginid: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              label="First Name*"
              placeholder="First Name"
              sx={buttonSx}
              required
              value={formData.fname}
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              label="Middle Name"
              placeholder="Middle Name"
              sx={buttonSx}
              value={formData.mname}
              onChange={(e) =>
                setFormData({ ...formData, mname: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              label="Last Name*"
              placeholder="Last Name"
              sx={buttonSx}
              required
              value={formData.lname}
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect
              label="Status*"
              required
              value={formData.status || ""}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "left", md: "center" }}
            gap={"15px"}
          >
            <Typography>Application Access*</Typography>
            <Stack
              direction={"row"}
              ml={"12px"}
              gap={"15px"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <CustomCheckBox
                label="Browser"
                id="browser"
                sx={{ backgroundColor: "#EEE", color: "#828282" }}
                checked={formData?.featuresaccess?.browser === "Browser"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuresaccess: {
                      ...formData.featuresaccess,
                      browser: e.target.checked ? "Browser" : "",
                    },
                  })
                }
              />
              <CustomCheckBox
                label="Mobile"
                id="mobile"
                sx={{ backgroundColor: "#EEE", color: "#828282" }}
                checked={formData?.featuresaccess?.mobile === "Mobile"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    featuresaccess: {
                      ...formData.featuresaccess,
                      mobile: e.target.checked ? "Mobile" : "",
                    },
                  })
                }
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "left", sm: "center" }}
            gap={"15px"}
          >
            <Typography>Functional Zone Details*</Typography>
            <CustomCheckBox
              label="All Child Zones"
              id="allChildZones"
              sx={{ backgroundColor: "#EEE", color: "#828282", ml: "1px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="State*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="City" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Entity Type*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Zonal Customers" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Modules*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Sub Modules*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Sub Module Features*" required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SecondarySelect label="DashBoard Reports*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Entity Reports*" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondarySelect label="Mobile Reports*" required />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <Stack mt={"10px"}>
              <CustomButton
                label="Upadte User"
                sx={{
                  textTransform: "capitalize",
                  maxWidth: "220px",
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
      </Stack>
    );
  };

  return (
    <>
      {viewEditModal ? (
        <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
          <Grid item xs={12}>
            <ViewUserEditTable />
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={"15px"} columnSpacing={"20px"}>
          <Grid item xs={12}>
            <SearchInput />
          </Grid>
          <Grid item xs={12}>
            <ViewUserTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewUser;
