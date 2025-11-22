import React from "react";
import { FaTrash, FaSort, FaEdit } from "react-icons/fa";

export default function UsersTable({
    users,
    sortByName,
    sortByEmail,
    openEditModal,
    openDeleteModal,
    getStatusClass,
}) {
    return (
        <div className="table-responsive">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>
                            <span
                                onClick={sortByName}
                                style={{ cursor: "pointer" }}
                                className="text-primary me-1 rounded-1 fs-5"
                            >
                                <FaSort />
                            </span>
                            Name
                        </th>
                        <th>
                            <span
                                onClick={sortByEmail}
                                style={{ cursor: "pointer" }}
                                className="text-primary me-1 rounded-1 fs-5 "
                            >
                                <FaSort />
                            </span>
                            Email
                        </th>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Joined Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td> <td>{item.email}</td>
                            <td>{item.id}</td>
                            <td>
                                <span className={getStatusClass(item.status)}>
                                    {item.status}
                                </span>
                            </td>
                            <td>{item.role}</td> <td>{item.date}</td>
                            <td className=" pb-3">
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
