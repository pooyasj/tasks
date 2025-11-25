import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchPerson({ search, setSearch }) {
    return (
        <div className="mb-3 position-relative w-100 border border-1 border-dark border-opacity-75 rounded-2">
            {/* icon search */}
            <FiSearch
                size={20}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "12px",
                    transform: "translateY(-50%)",
                    color: "#0033daff",
                }}
            />

            {/* search */}
            <input
                type="text"
                placeholder="Search"
                className="form-control ps-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}
