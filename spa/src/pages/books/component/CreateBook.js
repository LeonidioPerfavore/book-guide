import { Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { getInstanceAxios } from "../../../utils/axios/getInstanceAxios";

export const CreateBook = ({ setBooks }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [isWarningShown, setIsWarningShown] = useState(false);
    const [loadingMoreAuthors, setLoadingMoreAuthors] = useState(false);
    const [hasMoreAuthors, setHasMoreAuthors] = useState(true);
    const [page, setPage] = useState(1);

    const close = () => {
        setOpen(false);
        setIsWarningShown(false);
        setName("");
        setDesc("");
        setDate(null);
        setImage(null);
        setAuthors([]);
        setIsWarningShown(false);
        setOpen(false);
    };

    const getAuthors = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(
                backendUrl + "/api/author"
            );
            setAuthorsList(response.data.list.data);
        } catch (error) {
            console.log(error);
        }
    };

    const openCreateDialog = async () => {
        await getAuthors();
        setOpen(true);
    };

    const createBook = async (bookImage) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("short_description", desc);
        formData.append("image", bookImage, bookImage.name);
        formData.append("publication_date", date);
        formData.append("authors", JSON.stringify(authors));

        await getInstanceAxios()
            .post(backendUrl + "/api/book", formData)
            .then((response) => {
                setBooks((prevBooks) => [response.data.book, ...prevBooks]);
                setOpen(false);
            })
            .catch((error) => {
                setOpen(false);
                console.log(error);
            });
    };

    const handleCreateBook = async () => {
        if (name.trim().length < 3 || !image || !date || authors.length === 0) {
            setIsWarningShown(true);
            return;
        }

        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(image.type) || image.size > 2 * 1024 * 1024) {
            setIsWarningShown(true);
            return;
        }

        await createBook(image);

        setName("");
        setDesc("");
        setDate(null);
        setImage(null);
        setAuthors([]);
        setIsWarningShown(false);
        setOpen(false);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && hasMoreAuthors) {
            fetchMoreAuthors();
        }
    };

    const fetchMoreAuthors = async () => {
        setLoadingMoreAuthors(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(
                backendUrl + "/api/author?page=" + (page + 1)
            );

            setAuthorsList((prevAuthors) => [...prevAuthors, ...response.data.list.data]);
            setHasMoreAuthors(response.data.list.data.length > 0);
            setLoadingMoreAuthors(false);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.log(error);
            setLoadingMoreAuthors(false);
        }
    };

    useEffect(() => {
        if (open) {
            const authorSelectElement = document.getElementById("authorSelect");
            if (authorSelectElement) {
                authorSelectElement.addEventListener("scroll", handleScroll);
            }
        }

        return () => {
            const authorSelectElement = document.getElementById("authorSelect");
            if (authorSelectElement) {
                authorSelectElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [open]);

    return (
        <div>
            <div className={"create-icon-wrapper"}>
                <Button variant="success" className={"mt-2 create-icon"} onClick={openCreateDialog}>
                    CREATE
                </Button>
            </div>

            <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open}>
                <div className="dialog">
                    <div className="modal-content">
                        <div>
                            <form encType={'multipart/form-data'}>
                                <Form.Label htmlFor="name" className={'form-label'}>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                aria-describedby="nameCreateBookHelper"
                                value={name}
                                maxLength={200}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {isWarningShown && name.trim().length < 3 && (
                                <Form.Text id="nameCreateBookHelper" className={'validate-text'} style={{ color: "red" }}>
                                    Name must be 3 chars min
                                </Form.Text>
                            )}

                            <Form.Label htmlFor="descCreateBook" className={'form-label'}>Description</Form.Label>
                            <Form.Control
                                type="textarea"
                                id="desc"
                                aria-describedby="descCreateBook"
                                value={desc}
                                maxLength={200}
                                onChange={(e) => setDesc(e.target.value)}
                            />

                            <Form.Label htmlFor="date" className={'form-label'}>Date*</Form.Label>
                            <Form.Control
                                type="date"
                                id="date"
                                aria-describedby="dateHelper"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                                {isWarningShown && !date && (
                                    <Form.Text id="dateCreateHelper" className={'validate-text'} style={{ color: "red" }}>
                                        Date required.
                                    </Form.Text>
                                )}

                            <Form.Group controlId="image">
                                <Form.Label className={'form-label'}>Image*</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    name={'image'}
                                    onChange={handleImageChange} // Use the new handler for image change
                                />
                                {isWarningShown && (!image || image.size > 2 * 1024 * 1024) && (
                                    <Form.Text id="imageHelper" className={'validate-text'} style={{ color: "red" }}>
                                        Image is required (Max: 2 MB, only jpg & png).
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Label htmlFor="authorSelect" className={'form-label'}>Author(s)*</Form.Label>
                            <div id="authorSelect" className="author-select-container" onScroll={handleScroll}>
                                {authorsList.map((author) => (
                                    <Form.Check
                                        key={author.id}
                                        type="checkbox"
                                        id={`author-checkbox-${author.id}`}
                                        label={author.last_name}
                                        value={author.id}
                                        checked={authors.includes(author.id)}
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setAuthors((prevAuthors) => [...prevAuthors, author.id])
                                                : setAuthors((prevAuthors) =>
                                                    prevAuthors.filter((id) => id !== author.id)
                                                )
                                        }
                                    />
                                ))}
                                {loadingMoreAuthors && <p>Loading more authors...</p>}
                            </div>
                            {isWarningShown && authors.length === 0 && (
                                <Form.Text id="authorHelper" className={'validate-text'} style={{ color: "red" }}>
                                    At least one author must be selected.
                                </Form.Text>
                            )}
                            </form>

                        </div>
                    </div>

                    <button type="button" className={"dialog-btn-danger"}  onClick={close}>
                        CANCEL
                    </button>
                    <button type="button" className={"dialog-btn-success"} onClick={handleCreateBook}>
                        CREATE
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

export default CreateBook;
