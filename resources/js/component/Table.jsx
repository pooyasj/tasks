import React, { useState } from "react";
import dataJson from "../data.json";
import { FaTrash, FaSort, FaEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default function Table() {
    const [users, setUsers] = useState(dataJson);
    const [sortAsc, setSortAsc] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    // Search
    const [search, setSearch] = useState("");

    // Pagination
    const usersPerPage = 10;

    // Modal for Edit
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    // Modal for Add User
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDate, setNewDate] = useState("");

    // ---- open modal for editing ----
    const openModal = (user) => {
        setEditUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setShowModal(true);
    };

    // ---- open modal for adding user ----
    const openAddModal = () => {
        setShowAddModal(true);
    };

    // ---- close modal ----
    const closeModal = () => {
        setShowModal(false);
        setShowAddModal(false);
        setEditUser(null);
    };

    // ---- save changes (edit) ----
    const saveChanges = () => {
        const updated = users.map((item) =>
            item.id === editUser.id
                ? { ...item, name: editName, email: editEmail }
                : item
        );
        setUsers(updated);
        closeModal();
    };

    // ---- save new user ----
    const saveNewUser = () => {
        if (
            newName.length < 3 ||
            newEmail.length < 3 ||
            newRole.length < 3 ||
            newStatus.length < 3 ||
            !newDate
        ) {
            alert("Please fill out all fields with at least 3 characters.");
            return;
        }

        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(newEmail)) {
            alert("Please enter a valid email.");
            return;
        }

        const newUser = {
            id: users.length + 1, // Automatically assign new ID
            name: newName,
            email: newEmail,
            role: newRole,
            status: newStatus,
            date: newDate,
        };
        setUsers([...users, newUser]);
        closeModal();
    };

    // ---- delete ----
    const deleteUser = (id) => {
        setUsers(users.filter((item) => item.id !== id));
    };

    // ---- sort ----
    const sortByName = () => {
        const sorted = [...users].sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setUsers(sorted);
        setSortAsc(!sortAsc);
    };

    // ---- filter ----
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    // ---------------- Pagination ----------------
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    //   --------------------change url----------------
    const goToPage = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };

    return (
        <>
            {/* Search */}
            <div className="mb-3 border border-2 border-danger rounded-3">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Add User Button */}
            <div className="col btn btn-primary mb-3" onClick={openAddModal}>
                Add User
            </div>

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
                    {currentUsers.map((item) => (
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

            {/* ---------------- Pagination ---------------- */}
            <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
                <div className="col">
                    <nav>
                        <ul className="pagination">
                            {/* Prev Button */}
                            <li
                                className={`page-item ${
                                    currentPage === 1 && "disabled"
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => goToPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>

                            {/* Page Numbers */}
                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${
                                        page === currentPage && "active"
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}

                            {/* Next Button */}
                            <li
                                className={`page-item ${
                                    currentPage === totalPages && "disabled"
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => goToPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* ---------------- Add User Modal ---------------- */}
            {showAddModal && (
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
                                <h5 className="modal-title">Add User</h5>
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
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                    minLength={3}
                                />

                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    required
                                    minLength={3}
                                    pattern="^[^@]+@[^@]+\.[^@]+$" // Email validation with @
                                />

                                <label className="form-label">Role</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    required
                                    minLength={3}
                                />
                                <label className="form-label">Status</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    value={newStatus}
                                    onChange={(e) =>
                                        setNewStatus(e.target.value)
                                    }
                                    required
                                    minLength={3}
                                />

                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    required
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
                                    onClick={saveNewUser}
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
