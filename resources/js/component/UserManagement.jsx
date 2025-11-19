import React, { useEffect, useState } from "react";
import dataJson from "../data.json";
import SearchPerson from "./SearchPerson";
import AddUserButton from "./AddUserButton";
import UsersTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import EditModal from "./EditModal";
import DeleteUserModal from "./DeleteUserModel";
import Pagination from "./Pagination";
import Chart from "./Chart";
import { useSearchParams } from "react-router-dom";

export default function UserManagemant() {
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
    const [editStatus, setEditStatus] = useState("");
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
        setEditStatus(user.status);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditUser(null);
    };
    // ------------open delete modal--------
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // -------- Save Edit --------
    const saveChanges = () => {
        const updated = users.map((item) =>
            item.id === editUser.id
                ? {
                      ...item,
                      name: editName,
                      email: editEmail,
                      status: editStatus,
                  }
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
        Object.values(user).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
        )
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
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const monthlyCount = Array(12).fill(0);

    users.forEach((user) => {
        if (user.date) {
            const monthIndex = new Date(user.date).getMonth();
            monthlyCount[monthIndex] += 1;
        }
    });

    const chartData = monthNames.map((m, i) => ({
        month: m,
        count: monthlyCount[i],
    }));
    useEffect(function () {
        document.title = "user management";
    }, []);
    const sortByEmail = () => {
        const sorted = [...users].sort((a, b) =>
            sortAsc
                ? a.email.localeCompare(b.email)
                : b.email.localeCompare(a.email)
        );
        setUsers(sorted);
        setSortAsc(!sortAsc);
    };
    // ---------style status----------------
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return "text-dark fs-6  bg-success rounded-1 p-1"; // سبز
            case "inactive":
                return "text-dark fs-6  bg-danger rounded-1 p-1"; // قرمز
            case "pending":
                return "text-dark fs-6  bg-warning rounded-1 p-1"; // زرد
            default:
                return "";
        }
    };
    const confirmDelete = () => {
        deleteUser(userToDelete.id);
        setShowDeleteModal(false);
    };
    return (
        <>
            {/* Search User  */}

            <SearchPerson
                search={search}
                setSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
            />

            {/* Add User Button */}
            <AddUserButton onClick={openAddModal} />

            {/* Table */}
            <UsersTable
                users={currentUsers}
                sortByName={sortByName}
                sortByEmail={sortByEmail}
                openEditModal={openEditModal}
                openDeleteModal={(user) => {
                    setUserToDelete(user);
                    setShowDeleteModal(true);
                }}
                getStatusClass={getStatusClass}
            />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            />
            {/* ----------نمودار----------------- */}
            <Chart chartData={chartData} />
            {/* -------- Edit Modal -------- */}
            <EditModal
                show={showEditModal}
                close={closeEditModal}
                editName={editName}
                setEditName={setEditName}
                editEmail={editEmail}
                setEditEmail={setEditEmail}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
                saveChanges={saveChanges}
            />

            {/* -------- Add User Modal -------- */}
            <AddUserModal
                show={showAddModal}
                close={closeAddModal}
                newName={newName}
                setNewName={setNewName}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                newRole={newRole}
                setNewRole={setNewRole}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
                newDate={newDate}
                setNewDate={setNewDate}
                saveNewUser={saveNewUser}
            />
            {/* ------ Delete User Modal ------- */}

            {showDeleteModal && (
                <DeleteUserModal
                    show={showDeleteModal}
                    user={userToDelete}
                    close={() => setShowDeleteModal(false)}
                    confirmDelete={confirmDelete}
                />
            )}
        </>
    );
}
