import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import Router from "./router";
import { theme } from "./theme";
import BackToTop from "./components/BackToTop";
import store from "./redux";
import CustomToaster from "./components/CustomToaster";
import "reactflow/dist/style.css";

function App() {
  return (
    <Provider store={store}>
      <CustomToaster />
      <ThemeProvider theme={theme}>
        <Router />
        <BackToTop />
      </ThemeProvider>
    </Provider>
  );
}

export default App;