import React from "react";
import { FaTrash, FaSort, FaEdit } from "react-icons/fa";

export default function UsersTable({
    users,
    sortByName,
    sortByEmail,
    openEditModal,
    openDeleteModal,
    getStatusClass
}) {
    return (
        <div className="table-responsive">
            <table className="table table-dark table-striped" dir="rtl">
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>ID</th>
                        <th>
                            <span
                                onClick={sortByName}
                                style={{ cursor: "pointer" }}
                                className="bg-primary me-1 rounded-1 fs-5 p-1"
                            >
                                <FaSort />
                            </span>
                            Name
                        </th>

                        <th>
                            <span
                                onClick={sortByEmail}
                                style={{ cursor: "pointer" }}
                                className="bg-primary me-1 rounded-1 fs-5 p-1"
                            >
                                <FaSort />
                            </span>
                            Email
                        </th>

                        <th>Role</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <span
                                    className="text-info fs-5 style2"
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

                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>

                            <td>
                                <span className={getStatusClass(item.status)}>
                                    {item.status}
                                </span>
                            </td>

                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}