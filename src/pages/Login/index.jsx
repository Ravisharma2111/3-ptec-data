import React, { useState } from "react";
import { Box, Grid, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CustomButton, InputBox } from "../../components";
import allImgPaths from "../../assets/images/allImgPaths";
import { AppInfo } from "../../shared/constants";
import { login } from "../../redux/actions/authentication/auth";
import { LoginSchema } from "../../shared/validationSchema";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { isLoading } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: { userLoginId: "", userLoginPwd: "" },
    mode: "all",
  });

  const submit = (data) => {
    dispatch(login(data));
  };
  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Stack
            sx={{
              p: "34px 16px",
              display: "flex",
              flexDirection: "column",
              maxWidth: "498px",
              width: "100%",
            }}
            gap={{ xs: "30px", sm: "40px" }}
          >
            <img src={allImgPaths.appLogo} style={{ width: "min(20vw, 106px)" }} alt={AppInfo.name} />
            <Typography component="h1" variant="h3" fontSize={"min(10vw, 45px)"} fontWeight={"600"}>
              Log in your 3ptec
            </Typography>
            <Box
              component="form"
              noValidate
              display={"flex"}
              flexDirection={"column"}
              gap={{ xs: "30px", sm: "40px" }}
              onSubmit={handleSubmit(submit)}
            >
              <Stack gap={3}>
                <InputBox label="Login ID" control={control} name="userLoginId" placeholder="Login Id" required />
                <InputBox
                  label="Password"
                  control={control}
                  name="userLoginPwd"
                  placeholder="Password"
                  type={!showPass ? "password" : "text"}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {<img src={!showPass ? allImgPaths.eye : allImgPaths.eyeClosed} alt="eye-icon" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <CustomButton type="submit" label="Login" isLoading={isLoading} />
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          p={{ md: "60px", lg: "100px" }}
          paddingTop={"190px !important"}
          sx={{
            backgroundImage: `url(${allImgPaths.loginEllipsis})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1E293B",
            backgroundPosition: "right",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Stack gap={"36px"}>
            <Typography variant="h3" fontWeight={"700"} fontSize={"50px"} color={"#F2F2F2"}>
              Welcome
            </Typography>
            <Typography color={"#BDBDBD"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={"#F2F2F2"}
          >{`Copyright © ${AppInfo.name}. All rights reserved. Build Version ${AppInfo.version}`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
