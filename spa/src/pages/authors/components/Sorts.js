import React from "react";
import {FaSortAlphaDownAlt, FaSortAlphaUpAlt, FaSortNumericDown, FaSortNumericUpAlt} from "react-icons/fa";

export const Sorts = ({sortField, handleSortChange, sortDirection}) => {

    return (
        <div className={'sort-wrapper mt-2'}>
            <div className={`sort-item ${sortField === "first_name" ? "active-sort" : ""}`} onClick={() => handleSortChange("first_name")}>
                <span>First_name</span>
                {sortField === "first_name" && sortDirection === "ASC" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDownAlt />}
            </div>
            <div className={`sort-item ${sortField === "last_name" ? "active-sort" : ""}`} onClick={() => handleSortChange("last_name")}>
                <span>Last_name</span>
                {sortField === "last_name" && sortDirection === "ASC" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDownAlt />}
            </div>
            <div className={`sort-item ${sortField === "created_at" ? "active-sort" : ""}`} onClick={() => handleSortChange("created_at")}>
                <span>Date</span>
                {sortField === "created_at" && sortDirection === "ASC" ? <FaSortNumericUpAlt /> : <FaSortNumericDown />}
            </div>
        </div>
    );
};

export default Sorts;
