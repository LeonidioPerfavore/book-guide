import React from "react";
import {FaSortAlphaDownAlt, FaSortAlphaUpAlt} from "react-icons/fa";

export const Sorts = ({sortField, handleSortChange, sortDirection}) => {

    return (
        <div className={'grid-container'}>
            <div className={'centered-text'}>
                <div className={`sort-item-book ${sortField === "name" ? "active-sort" : ""}`} onClick={() => handleSortChange("name")}>
                    <span>Name</span>
                    {sortField === "name" && sortDirection === "ASC" ? <FaSortAlphaUpAlt /> : <FaSortAlphaDownAlt />}
                </div>
            </div>
        </div>
    );
};

export default Sorts;
