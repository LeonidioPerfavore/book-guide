import React from "react";
import { Button } from "react-bootstrap";

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    if(!totalItems || totalItems  < 15){
        return null;
    }

    return (
        <div aria-label="Pagination" className="mt-3 pagination-wrapper" id={'pagination-wrapper'}>
            {pagesArray.map((page) => (
                <Button
                    className={'pagination-btn'}
                    key={page}
                    variant={currentPage === page ? "primary" : "light"}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </Button>
            ))}
        </div>
    );
};

export default PaginationComponent;
