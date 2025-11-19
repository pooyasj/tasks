import React from "react";

export default function AddUserButton({ onClick }) {
    return (
        <button
            className="btn btn-primary mb-3 col-12 col-md-2 style3"
            onClick={onClick}
        >
            Add User
        </button>
    );
}