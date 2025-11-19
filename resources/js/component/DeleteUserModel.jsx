import React from "react";

export default function DeleteUserModal({
    show,
    user,
    close,
    confirmDelete
}) {
    if (!show) return null;

    return (
        <div
            className="modal fade show z-3"
            style={{ display: "block", background: "rgba(0,0,0,0.7)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content bg-dark text-white">
                    
                    <div className="modal-header">
                        <h5>Delete User</h5>
                        <button
                            className="btn-close btn-close-white"
                            onClick={close}
                        ></button>
                    </div>

                    <div className="modal-body">
                        Are you sure you want to delete
                        <strong> {user?.name}</strong>?
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={close}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}