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

    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const [search, setSearch] = useState("");

    const usersPerPage = 10;

    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDate, setNewDate] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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

    const saveChanges = () => {
        const updated = users.map((item) =>
            item.id === editUser.id
                ? { ...item, name: editName, email: editEmail }
                : item
        );
        setUsers(updated);
        closeEditModal();
    };

    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const saveNewUser = () => {
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

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((u) => u.id !== userToDelete.id));
        setShowDeleteModal(false);
    };

    const sortByName = () => {
        const sorted = [...users].sort((a, b) =>
            sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        setUsers(sorted);
        setSortAsc(!sortAsc);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const goToPage = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };

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

    useEffect(() => {
        document.title = "user management";
    }, []);

    return (
        <>
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

            <button className="btn btn-primary mb-3 col-2" onClick={openAddModal}>
                Add User
            </button>

            <table className="table table-dark table-striped">
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
                                    onClick={() => openDeleteModal(item)}
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

            <div className="mt-3 d-flex justify-content-center">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                            Previous
                        </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                            <button className="page-link" onClick={() => goToPage(page)}>
                                {page}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>

            {showDeleteModal && (
                <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.7)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5>Delete User</h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete
                                    <strong className="text-danger"> {userToDelete?.name} </strong>?
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
