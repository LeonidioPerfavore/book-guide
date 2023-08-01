import Header from "../../components/header/Header";
import {Col, Container, Form, Spinner} from "react-bootstrap";
import React from "react";
import {useState} from "react";
import SearchReset from "../../components/filter/SearchReset";
import {useEffect} from "react";
import {getInstanceAxios} from "../../utils/axios/getInstanceAxios";
import CreateBook from "./component/CreateBook";
import Sorts from "./component/Sorts";
import List from "./component/List";
import PaginationComponent from "../../components/list/PaginationCompoent";

export const Books = () => {
    const [searchValue, setSearchValue] = useState("");
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        if(event.target.value === '' && !sortField){
            getBooks();
        }
    };
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [preloader, setPreloader] = useState(true);
    const [books, setBooks] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    const itemsPerPage = 15;

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        setPreloader(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/book');
            setBooks(response.data.list.data);
            setTotal(response.data.list.total);
            setPreloader(false);
        } catch (error) {
            console.log(error);
            // Обработка ошибки, если необходимо
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getDataBySearch(page);
    };

    const getDataBySearch = async (page) => {
        try {

            setPreloader(true);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            let queryParams = {
                perPage: itemsPerPage,
                page,
            };

            if (sortField && sortDirection) {
                queryParams.sort = sortField;
                queryParams.sortBy = sortDirection;
            }


            if (searchValue) {
                queryParams.search = searchValue;
            }

            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/book', {
                params: queryParams,
            });

            setBooks(response.data.list.data);
            setTotal(response.data.list.total);
            setPreloader(false);
        } catch (error) {
            console.log(error);
            setPreloader(false);
        }
    }

    const resetFilters = () => {
        if (searchValue || sortField) {
            setSearchValue("");
            setSortField(null);
            setSortDirection(null);
            setBooks(null);
            getBooks();
        }
    }

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

            <h1 className={'main-header'}>Books</h1>

            <Container className="col-10 col-sm-6 col-md-6">
                <Col sm={12}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 rounded-pill"
                        aria-label="Search"
                        value={searchValue}
                        maxLength={100}
                        onChange={handleSearchChange}
                    />
                </Col>
                <Sorts sortField={sortField} handleSortChange={handleSortChange} sortDirection={sortDirection} />
                <SearchReset getDataBySearch={getDataBySearch} resetFilters={resetFilters} />
                <CreateBook setBooks={setBooks} />
            </Container>


            {preloader
                ?
                <div className={'preloader-wrapper'}>
                    <Spinner animation="grow" variant="info"/>
                </div>
                :
                <List books={books} setBooks={setBooks} />}

            <PaginationComponent
                totalItems={total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Books;
