import React from 'react'

export default function SearchPerson({search , setSearch}) {
  return (
    <>
    {/* Search */}
            <div className="mb-3 border border-2 border-dark rounded-3 w-100">
                <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div></>
  )
}
