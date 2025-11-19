import React from 'react'

export default function Pagination({currentPage , totalPages , goToPage}) {
  return (
    <>
     <div className="mt-3 d-flex justify-content-center">
                    <ul className="pagination">
                        <li
                            className={`page-item ${
                                currentPage === 1 && "disabled"
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => goToPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
    
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <li
                                    key={page}
                                    className={`page-item ${
                                        page === currentPage && "active"
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        )}
                        <li
                            className={`page-item ${
                                currentPage === totalPages && "disabled"
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => goToPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
    </>
  )
}
