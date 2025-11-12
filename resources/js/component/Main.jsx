import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
function Main() {
    return (
        <>
           <BrowserRouter><App/></BrowserRouter>
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
