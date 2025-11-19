import React from "react";
import UserManagemant from "./UserManagement";
export default function Layout() {
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center mt-3">
                    <div className="col-12 col-md-10  text-center row flex-column justify-center align-items-center">
                        <div className="col">
                            <UserManagemant/>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
}
