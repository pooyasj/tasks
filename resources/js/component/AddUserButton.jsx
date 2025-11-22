import React from "react";
import { FiPlus } from "react-icons/fi";

export default function AddUserButton({ onClick }) {
    return (
        <button
            className="btn btn-primary mb-3 col-12 col-md-3  d-flex align-items-center justify-content-center gap-2"
            onClick={onClick}
        >
            <FiPlus size={18} />
            Add User
        </button>
    );
}