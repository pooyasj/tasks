import React from "react";
import Table from "./Table";

export default function Layout() {
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center mt-3">
                    <div className="col-10  text-center row flex-column justify-center align-items-center">
                        <div className="col">
                            <Table />
                        </div>
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
