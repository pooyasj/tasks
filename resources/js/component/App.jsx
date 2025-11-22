import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NotFound from "./NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}
