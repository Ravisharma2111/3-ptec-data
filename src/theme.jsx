import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

export const layout = {
  navbarHeight: "80px",
};

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: "#F9F9F9", [`& .${outlinedInputClasses.notchedOutline}`]: { borderColor: "#828282" } } },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {},
      },
    },
  },
});
