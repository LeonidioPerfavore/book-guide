import {useState} from "react";
import {getInstanceAxios} from "../../../../utils/axios/getInstanceAxios";
import DialogComponent from "./components/DialogComponent";
import ListComponent from "./components/ListComponent";
import {Button} from "react-bootstrap";
import PaginationComponent from "../../../../components/list/PaginationCompoent";

const List = ({ sortField, sortDirection,searchValue, total, setTotal, authors, setAuthors }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [preloader, setPreloader] = useState(true);

    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState(null);

    const [actionOption, setActionOption] = useState({
        "btn-class": "dialog-btn-danger",
        func: null,
        "btn-text": "",
    });
    const [cancelOption, setCancelOption] = useState({
        "btn-class": "dialog-btn-success",
        func: null,
    });
    const [prevSearchParams, setPrevSearchParams] = useState({});

    const itemsPerPage = 15;

    const handlePageChange = async (page) => {
        setCurrentPage(page);
       await getDataBySearch(page);
    };

    const getDataBySearch = async (page = 1) => {
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

            // Проверяем, изменились ли параметры поиска
            const isSearchParamsChanged =
                queryParams.search !== prevSearchParams.search ||
                queryParams.sort !== prevSearchParams.sort ||
                queryParams.sortBy !== prevSearchParams.sortBy ||
                queryParams.page !== prevSearchParams.page;

            if (isSearchParamsChanged) {

                const response = await getInstanceAxios().get(
                    backendUrl + "/api/author",
                    {
                        params: queryParams,
                    }
                );

                setAuthors(response.data.list.data);
                setPreloader(false);
                setPrevSearchParams(queryParams);
                setTotal(response.data.list.total);

            } else {
                setPreloader(false);
            }
        } catch (error) {
            console.log(error);
            setPreloader(false);
        }
    };

    const getAuthor = (elem) => {
        let author = authors.find((x) => Number(x.id) === Number(elem.id));
        setAuthor(author);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const openDeleteDialog = (e) => {
        getAuthor(e.currentTarget);
        setActionOption({
            "btn-class": "dialog-btn-danger",
            func: deleteAuthor,
            "btn-text": "DELETE",
        });
        setCancelOption({
            "btn-class": "dialog-btn-success",
            func: closeDialog,
        });
        setOpen(true);
    };

    const openEditDialog = (e) => {
        getAuthor(e.currentTarget);
        setActionOption({
            "btn-class": "dialog-btn-success",
            func: updateAuthor,
            "btn-text": "UPDATE",
        });
        setCancelOption({
            "btn-class": "dialog-btn-danger",
            func: closeDialog,
        });
        setOpen(true);
    };

    const openCreateDialog = () => {
        setAuthor(null);
        setActionOption({
            "btn-class": "dialog-btn-success",
            func: createAuthor,
            "btn-text": "CREATE",
        });
        setCancelOption({
            "btn-class": "dialog-btn-danger",
            func: closeDialog,
        });
        setOpen(true);
    };

    const deleteAuthor = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        await getInstanceAxios("Content-Type: application/json")
            .delete(backendUrl + "/api/author?id=" + author.id)
            .then((response) => {
                setAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
                setOpen(false);
            })
            .catch((error) => {
                setOpen(false);
                console.log(error);
            });
    };

    const updateAuthor = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const data = { id: author.id, first_name: author.first_name, last_name: author.last_name };

        if (author.middle_name && author.middle_name.trim().length > 0) {
            data.middle_name = author.middle_name.trim();
        }

        await getInstanceAxios("Content-Type: application/json")
            .put(backendUrl + "/api/author", data)
            .then((response) => {
                const index = authors.findIndex((author) => author.id === data.id);
                if (index !== -1) {
                    const updatedAuthors = [...authors];
                    updatedAuthors[index] = data;
                    setAuthors(updatedAuthors);
                }

                setOpen(false);
            })
            .catch((error) => {
                setOpen(false);
                console.log(error);
            });
    };

    const createAuthor = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const data = { id: author.id, first_name: author.first_name, last_name: author.last_name };

        if (author.middle_name && author.middle_name.trim().length > 0) {
            data.middle_name = author.middle_name.trim();
        }

        await getInstanceAxios("Content-Type: application/json")
            .post(backendUrl + "/api/author", data)
            .then((response) => {
                setAuthors((prevAuthors) => [response.data.author, ...prevAuthors]);
                setOpen(false);
            })
            .catch((error) => {
                setOpen(false);
                console.log(error);
            });
    };

    return (
        <div>
            <div className={"create-icon-wrapper"}>
                <Button variant="success" className={"mt-2 create-icon"} onClick={openCreateDialog}>
                    CREATE
                </Button>
            </div>

            <ListComponent authors={authors} openDeleteDialog={openDeleteDialog} openEditDialog={openEditDialog} />

            <PaginationComponent
                totalItems={total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <DialogComponent
                open={open}
                onClose={closeDialog}
                actionOption={actionOption}
                cancelOption={cancelOption}
                author={author}
                updateAuthor={updateAuthor}
                deleteAuthor={deleteAuthor}
                createAuthor={createAuthor}
                setAuthor={setAuthor}
            />
        </div>
    );
};

export default List;
