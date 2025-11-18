import React, { useState } from "react";
import dataJson from "../data.json";
import { FaTrash } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
export default function Table() {
    const [users, setUsers] = useState(dataJson);
    const [sortAsc, setSortAsc] = useState(true);
    // --------------فانکشن حذف کاربر------------
    const deleteUser = (id) => {
        setUsers(users.filter((item) => item.id !== id));
    };
    // --------------فانکشنsortکاربر-------------
    const sortByName = () => {
        const sorted = [...users].sort((a, b) => {
            return sortAsc
                ? a.name.localeCompare(b.name) // A → Z
                : b.name.localeCompare(a.name); // Z → A
        });

        setUsers(sorted);
        setSortAsc(!sortAsc);
    };

    return (
        <>
            <table className="table mb-0 table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Delete</th>
                        <th scope="col">id</th>

                        <th scope="col">
                            <span
                                className="bg-primary me-1 rounded-1 fs-5 p-1"
                                style={{ cursor: "pointer" }}
                                onClick={sortByName}
                            >
                                <FaSort />
                            </span>
                            name
                        </th>

                        <th scope="col">email</th>
                        <th scope="col">role</th>
                        <th scope="col">status</th>
                        <th scope="col">date</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
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
        </>
    );
}
