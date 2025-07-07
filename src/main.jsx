import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Router>
    <ToastContainer
      autoClose={1500}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
    <App />
  </Router>
);
