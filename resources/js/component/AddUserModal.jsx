import React from "react";

export default function AddUserModal({
    show,
    close,
    newName,
    setNewName,
    newEmail,
    setNewEmail,
    newRole,
    setNewRole,
    newStatus,
    setNewStatus,
    newDate,
    setNewDate,
    saveNewUser,
}) {
    if (!show) return null;
    return (
        <div
            className="modal fade show style4"
            style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5>Add User</h5>
                        <button
                            className="btn-close btn-close-white"
                            onClick={close}
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
                            onChange={(e) => setNewEmail(e.target.value)}
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
                        <select
                            className="form-control mb-2"
                            required
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="active">active</option>
                            <option value="pending">pending</option>
                            <option value="inactive">inactive</option>
                        </select>

                        <label>Date</label>
                        <input
                            className="form-control"
                            type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={close}>
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
    );
}
