import React, { useState, useEffect } from "react";
import {Button, Col, Container, Form, Spinner} from "react-bootstrap";
import { getInstanceAxios } from "../../utils/axios/getInstanceAxios";
import List from "./components/List/List";
import Header from "../../components/header/Header";
import Sorts from "./components/Sorts";

export const Authors = () => {
    const [authors, setAuthors] = useState(null);
    const [preloader, setPreloader] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getAuthors();
    }, []);

    const getAuthors = async () => {
        setPreloader(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/author');
            setAuthors(response.data.list.data);
            setTotal(response.data.list.total);
            setPreloader(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = async (event) => {
        setSearchValue(event.target.value);
        if(event.target.value === '' && !sortField){
           await getAuthors();
        }
    };

    const getDataBySearch = async () => {

        try {
            if (!sortField && !searchValue) {
                return;
            }

            setPreloader(true);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const queryParams = {};

            if (sortField && sortDirection) {
                queryParams.sort = sortField;
                queryParams.sortBy = sortDirection;
            }

            if (searchValue) {
                queryParams.search = searchValue;
            }

            queryParams.perPage = 1;

            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/author', {
                params: queryParams,
            });

            setAuthors(response.data.list.data);
            setTotal(response.data.list.total);
            setPreloader(false);
        } catch (error) {
            console.log(error);
            setPreloader(false);
        }
    };

    const resetFilters = async () => {
        if (searchValue || sortField) {
            setSearchValue("");
            setSortField(null);
            setSortDirection(null);
            setAuthors(null);
           await getAuthors();
        }
    };

    const handleSortChange = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortField(field);
            setSortDirection("ASC");
        }
    };

    return (
        <div>

            <Header />

            <h1 className={'main-header'}>Authors</h1>

            <Container className="test col-10 col-sm-4">
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
                <Sorts sortDirection={sortDirection} sortField={sortField} handleSortChange={handleSortChange} />
                <div className={'d-flex'}>
                    <Button className="rounded-pill mt-2" variant="outline-primary" onClick={getDataBySearch}>
                        Search
                    </Button>
                    <div className={'spacer'} />
                    <Button className="rounded-pill mt-2" variant="outline-dark" onClick={resetFilters}>
                        Reset
                    </Button>
                </div>
            </Container>

            {preloader
                ?
                <div className={'preloader-wrapper'}>
                    <Spinner animation="grow" variant="info" />
                </div>
                :
                <List
                    sortField={sortField}
                    sortDirection={sortDirection}
                    total={total} setTotal={setTotal}
                    authors={authors}
                    setAuthors={setAuthors}
                    searchValue={searchValue}
                />}


        </div>
    );
};

export default Authors;
