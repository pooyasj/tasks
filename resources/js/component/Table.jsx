import React, { useState } from "react";
import dataJson from "../data.json";
import { FaTrash } from "react-icons/fa";

export default function Table() {

    const [users, setUsers] = useState(dataJson);

    const deleteUser = (id) => {
        const filtered = users.filter((item) => item.id !== id);
        setUsers(filtered);
    };

    return (
        <>
            <table className="table mb-0 table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Delete</th>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
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