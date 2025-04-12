import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="560821215083-mrh3e8ojvona8ugtd6gf6q6tlttujdib.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
