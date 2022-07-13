import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/system";
//import reportWebVitals from "./reportWebVitals";?????(ZAYRA)
import { Provider } from "react-redux";
import { store } from "./redux/store";
/* PARA LOS COLORES => import { green, purple } from "@mui/material/colors"; (ZAYRA)*/
import { theme } from "./theme";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-83yzfxae.us.auth0.com"
        clientId="9mlZRiov0RPOd4jMVCgu52HjlumqbRqE"
        redirectUri="http://localhost:3000/home">
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
