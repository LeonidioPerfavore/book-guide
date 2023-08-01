import {Col, Form} from "react-bootstrap";
import React from "react";

export const SearchForm = ({searchValue, handleSearchChange}) => {

    return (
                <Col sm={12}>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 rounded-pill"
                            aria-label="Search"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </Form>
                </Col>
    );
};

export default SearchForm;
