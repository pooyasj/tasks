import React from "react";
import { FaTrash, FaSort, FaEdit, FaSearch } from "react-icons/fa";

export default function UsersTable({
    users,
    sortByName,
    sortByEmail,
    openEditModal,
    openDeleteModal,
    getStatusClass,
}) {
    return (
        <div className="table-responsive rounded-3">
            <table className="table table-dark table-striped">
                <thead>
                    <tr className="bg-primary text-danger">
                        <th className="text-center">ID</th>
                        <th className=" text-start">
                            <span
                                onClick={sortByName}
                                style={{ cursor: "pointer" }}
                                className="text-primary me-1 rounded-1 fs-5"
                            >
                                <FaSort />
                            </span>
                            FullName
                        </th>
                        <th className="text-start">
                            <span
                                onClick={sortByEmail}
                                style={{ cursor: "pointer" }}
                                className="text-primary me-1 rounded-1 fs-5 "
                            >
                                <FaSort />
                            </span>
                            Email
                        </th>
                        <th className="text-center">Status</th>
                        <th className="text-start">Role</th>
                        <th>Joined Date</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td className="text-center col col-md-1">
                                {item.id}
                            </td>
                            <td className="text-start col">{item.name}</td>
                            <td className="text-start col col-md-2">
                                {item.email}
                            </td>
                            <td className="text-center col">
                                <span
                                    className={`status-label ${getStatusClass(
                                        item.status
                                    )}`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="text-start col-md-1">{item.role}</td>{" "}
                            <td>{item.date}</td>
                            <td>
                                <span
                                    className="text-info  style2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openEditModal(item)}
                                >
                                    <FaEdit />
                                </span>
                            </td>
                            <td>
                                <span
                                    className="text-danger style1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openDeleteModal(item)}
                                >
                                    <FaTrash />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
