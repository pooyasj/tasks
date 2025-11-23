import React from "react";
import { FaTrash, FaSort, FaEdit, FaSearch } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
export default function UsersTable({
    users,
    sortByName,
    sortByEmail,
    sortByRole,
    openEditModal,
    openDeleteModal,
    getStatusClass,
    sortByStatus,
}) {
    return (
        <>
            {/* ---------------------------For mobile size--------------------------------- */}
            <div className="container-fluid px-0  d-sm-none">
                <div className="row justify-content-center align-items-center px-1">
                    <div className="col row justify-content-center align-items-center px-0">
                        <div className=" col d-flex justify-content-center d-sm-none mb-2 p-0">
                            <button
                                onClick={sortByName}
                                className="btn btn-white btn-sm px-0"
                            >
                                Name <FaSort className="ms-0 text-primary" />
                            </button>
                        </div>
                        <div className=" col d-flex justify-content-center d-sm-none mb-2 p-0">
                            <button
                                onClick={sortByEmail}
                                className="btn btn-white btn-sm px-0"
                            >
                                Email <FaSort className="ms-0 text-primary" />
                            </button>
                        </div>
                        <div className=" col d-flex justify-content-center d-sm-none mb-2 p-0">
                            <button
                                onClick={sortByStatus}
                                className="btn btn-white btn-sm px-0"
                            >
                                Status <FaSort className="ms-0 text-primary" />
                            </button>
                        </div>
                        <div className=" col d-flex justify-content-center d-sm-none mb-2 p-0">
                            <button
                                onClick={sortByRole}
                                className="btn btn-white btn-sm px-0"
                            >
                                Role <FaSort className="ms-0 text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ---------------------------------------------------------------------------- */}
            <div className="table-responsive">
                <table className="table  table-striped">
                    {/* ------------------------------thead------------------------------- */}
                    <thead>
                        <tr>
                            <th className=" text-start  ps-4">
                                Full Name
                                <span
                                    onClick={sortByName}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary ms-1 rounded-1 fs-5"
                                >
                                    <FaSort />
                                </span>
                            </th>
                            <th className="text-start">
                                Email
                                <span
                                    onClick={sortByEmail}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary ms-2 rounded-1 fs-5 "
                                >
                                    <FaSort />
                                </span>
                            </th>
                            <th className="text-center">
                                Status
                                <span
                                    onClick={sortByStatus}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary ms-2 rounded-1 fs-5 "
                                >
                                    <FaSort />
                                </span>
                            </th>
                            <th className="text-start">
                                Role
                                <span
                                    onClick={sortByRole}
                                    style={{ cursor: "pointer" }}
                                    className="text-primary ms-2 rounded-1 fs-5 "
                                >
                                    <FaSort />
                                </span>
                            </th>
                            <th>Joined Date</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    {/* ------------------------------tbody------------------------------- */}
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td
                                    data-label="Name"
                                    className="text-start col ps-md-4"
                                >
                                    {item.name}
                                </td>
                                <td
                                    data-label="Email"
                                    className="text-start col col-md-2 "
                                >
                                    <span className="style6">{item.email}</span>
                                </td>
                                <td
                                    data-label="Status"
                                    className="text-center col"
                                >
                                    <span
                                        className={`status-label ${getStatusClass(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td
                                    data-label="Role"
                                    className="text-start col-md-1"
                                >
                                    {item.role}
                                </td>
                                <td data-label="Data">{item.date}</td>
                                <td
                                    data-label="Edit User"
                                    className=" text-end"
                                >
                                    <span
                                        className="text-primary  style2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => openEditModal(item)}
                                    >
                                        <FaEdit />
                                    </span>
                                </td>
                                <td
                                    data-label="Delete"
                                    className=" text-start border-0"
                                >
                                    <span
                                        className="text-danger style1"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => openDeleteModal(item)}
                                    >
                                        <FaTrashAlt />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* ------------------------------------------------------- */}
                </table>
            </div>
        </>
    );
}
