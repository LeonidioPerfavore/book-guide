import {Button} from "react-bootstrap";
import React from "react";

export const SearchReset = ({getDataBySearch, resetFilters}) => {

    return (
        <div className={'d-flex'}>
            <Button className="rounded-pill mt-2" variant="outline-primary" onClick={getDataBySearch}>
                Search
            </Button>
            <div className={'spacer'} />
            <Button className="rounded-pill mt-2" variant="outline-dark" onClick={resetFilters}>
                Reset
            </Button>
        </div>
    );
};

export default SearchReset;
