import React, { useState } from "react";
import dataJson from "../data.json";
import { FaTrash, FaSort, FaEdit } from "react-icons/fa";

export default function Table() {
    const [users, setUsers] = useState(dataJson);
    const [sortAsc, setSortAsc] = useState(true);

    // حالت مدال
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    // ---- باز کردن مدال ----
    const openModal = (user) => {
        setEditUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setShowModal(true);
    };

    // ---- بستن مدال ----
    const closeModal = () => {
        setShowModal(false);
        setEditUser(null);
    };

    // ---- ذخیره تغییرات ----
    const saveChanges = () => {
        const updated = users.map((item) =>
            item.id === editUser.id
                ? { ...item, name: editName, email: editEmail }
                : item
        );
        setUsers(updated);
        closeModal();
    };

    // ---- حذف ----
    const deleteUser = (id) => {
        setUsers(users.filter((item) => item.id !== id));
    };

    // ---- Sort ----
    const sortByName = () => {
        const sorted = [...users].sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setUsers(sorted);
        setSortAsc(!sortAsc);
    };

    return (
        <>
            <table className="table mb-0 table-dark table-striped">
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>id</th>
                        <th>
                            <span
                                className="bg-primary me-1 rounded-1 fs-5 p-1"
                                style={{ cursor: "pointer" }}
                                onClick={sortByName}
                            >
                                <FaSort />
                            </span>
                            name
                        </th>
                        <th>email</th>
                        <th>role</th>
                        <th>status</th>
                        <th>date</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <span
                                    className="text-info fs-5"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openModal(item)}
                                >
                                    <FaEdit />
                                </span>
                            </td>

                            <td>
                                <span
                                    className="text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteUser(item.id)}
                                >
                                    <FaTrash />
                                </span>
                            </td>

                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ---------------- Modal ---------------- */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,0.6)",
                    }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={closeModal}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                />

                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={editEmail}
                                    onChange={(e) =>
                                        setEditEmail(e.target.value)
                                    }
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={saveChanges}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
