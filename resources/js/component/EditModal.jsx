import React from "react";

export default function EditModal({
    show,
    close,
    editName,
    setEditName,
    editEmail,
    setEditEmail,
    editStatus,
    setEditStatus,
    saveChanges,
}) {
    if (!show) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
        >
            <div className="modal-dialog ">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5>Edit User</h5>
                        <button
                            className="btn-close btn-close-white"
                            onClick={close}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <label>Name</label>
                        <input
                            className="form-control mb-2"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            className="form-control"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />

                        <label>Status</label>
                        <select
                            className="form-control mb-2"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                        >
                            <option value="active">active</option>
                            <option value="pending">pending</option>
                            <option value="inactive">inactive</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={close}>
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
    );
}
