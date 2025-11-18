import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}></Route>
        </Routes>
    );
}
