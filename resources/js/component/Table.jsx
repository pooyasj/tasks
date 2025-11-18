import React, { useEffect, useState } from "react";
import dataJson from "../data.json";
import { FaTrash, FaSort, FaEdit } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
export default function Table() {
    const [users, setUsers] = useState(dataJson);
    const [sortAsc, setSortAsc] = useState(true);

    // URL Page
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    // Search
    const [search, setSearch] = useState("");

    // Pagination
    const usersPerPage = 10;

    // -------- Edit Modal State --------
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    // -------- Add User Modal State --------
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDate, setNewDate] = useState("");

    // -------- Open Edit Modal --------
    const openEditModal = (user) => {
        setEditUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditUser(null);
    };

    // -------- Save Edit --------
    const saveChanges = () => {
        const updated = users.map((item) =>
            item.id === editUser.id
                ? { ...item, name: editName, email: editEmail }
                : item
        );
        setUsers(updated);
        closeEditModal();
    };

    // -------- Open Add User Modal --------
    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    // -------- Save New User --------
    const saveNewUser = () => {
        if (
            newName.length < 3 ||
            newEmail.length < 3 ||
            newRole.length < 3 ||
            newStatus.length < 3 ||
            !newDate
        ) {
            alert("Please fill all fields correctly (min 3 chars).");
            return;
        }

        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(newEmail)) {
            alert("Invalid Email!");
            return;
        }

        const newUser = {
            id: users.length + 1,
            name: newName,
            email: newEmail,
            role: newRole,
            status: newStatus,
            date: newDate,
        };

        setUsers([...users, newUser]);
        closeAddModal();
    };

    // -------- Delete User --------
    // -------- Delete User --------
const deleteUser = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    setUsers(users.filter((u) => u.id !== id));
};

    // -------- Sort --------
    const sortByName = () => {
        const sorted = [...users].sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setUsers(sorted);
        setSortAsc(!sortAsc);
    };

    // -------- Filtering --------
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    // -------- Pagination Logic --------
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const goToPage = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };
    // --------------نمودار----------------
    // Prepare monthly signup chart
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const monthlyCount = Array(12).fill(0);

users.forEach(user => {
    if (user.date) {
        const monthIndex = new Date(user.date).getMonth();
        monthlyCount[monthIndex] += 1;
    }
});

const chartData = monthNames.map((m, i) => ({
    month: m,
    count: monthlyCount[i]
}));
useEffect(function(){
    document.title="user management"
},[])
    return (
        <>
            {/* Search */}
            <div className="mb-3 border border-2 border-danger rounded-3 w-100">
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
            <button
                className="btn btn-primary mb-3 col-12 col-md-2"
                onClick={openAddModal}
            >
                Add User
            </button>

            {/* Table */}
            <div className=" table-responsive"><table className="table table-dark table-striped">
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
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <span
                                    className="text-info fs-5"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openEditModal(item)}
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
            </table></div>
            

            {/* Pagination */}
            <div className="mt-3 d-flex justify-content-center">
                <ul className="pagination">
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

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
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
                        )
                    )}
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
            </div>
            {/* ----------نمودار----------------- */}
<div className="mt-5 p-4 bg-white rounded shadow mb-4">
    <h5 className="mb-3">Users per month</h5>

    <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    </ResponsiveContainer>
</div>
            {/* -------- Edit Modal -------- */}
            {showEditModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5>Edit User</h5>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={closeEditModal}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label>Name</label>
                                <input
                                    className="form-control mb-2"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                />

                                <label>Email</label>
                                <input
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
                                    onClick={closeEditModal}
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

            {/* -------- Add User Modal -------- */}
            {showAddModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5>Add User</h5>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={closeAddModal}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <label>Name</label>
                                <input
                                    className="form-control mb-2"
                                    minLength={3}
                                    required
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />

                                <label>Email</label>
                                <input
                                    className="form-control mb-2"
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                />

                                <label>Role</label>
                                <input
                                    className="form-control mb-2"
                                    minLength={3}
                                    required
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                />
                                <label>Status</label>
                                <input
                                    className="form-control mb-2"
                                    minLength={3}
                                    required
                                    value={newStatus}
                                    onChange={(e) =>
                                        setNewStatus(e.target.value)
                                    }
                                />

                                <label>Date</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    required
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={closeAddModal}
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
