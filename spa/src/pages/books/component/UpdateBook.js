import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { getInstanceAxios } from "../../../utils/axios/getInstanceAxios";
import { Form } from "react-bootstrap";

const UpdateBook = ({ updateDialogOpen, setUpdateDialogOpen, book, books, setBooks }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(book.image);
    const [authors, setAuthors] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [isWarningShown, setIsWarningShown] = useState(false);
    const [loadingMoreAuthors, setLoadingMoreAuthors] = useState(false);
    const [hasMoreAuthors, setHasMoreAuthors] = useState(true);
    const [page, setPage] = useState(1);

    const dummyImageFile = new File([], "dummy_image.jpg", { type: "image/jpeg" });

    useEffect(() => {
        // Fetch the initial list of authors when the dialog is opened
        if (updateDialogOpen) {
            getAuthors();
            setInitialFormValues();
        }
    }, [updateDialogOpen]);

    const close = () => {
        setUpdateDialogOpen(false);
        setIsWarningShown(false);
    };

    const setInitialFormValues = () => {
        setName(book.name || "");
        setDesc(book.short_description || "");
        setDate(book.publication_date || "");
        setImage(null);

        // Get the IDs of the authors associated with the book
        const authorIds = book.authors.map((author) => author.id);

        // Set the authors associated with the book as checked
        setAuthors(authorIds);
    };

    const getAuthors = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(
                backendUrl + "/api/author?page=" + page
            );

            // Combine the existing authors with the new ones fetched via lazy loading
            setAuthorsList((prevAuthors) => {
                const authorIds = prevAuthors.map((author) => author.id);
                const newAuthors = response.data.list.data.filter((author) => !authorIds.includes(author.id));
                return [...prevAuthors, ...newAuthors];
            });

            setHasMoreAuthors(response.data.list.data.length > 0);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreAuthors = async () => {
        setLoadingMoreAuthors(true);
        try {
            setPage((prevPage) => prevPage + 1);
            await getAuthors();
            setLoadingMoreAuthors(false);
        } catch (error) {
            console.log(error);
            setLoadingMoreAuthors(false);
        }
    };

    const updateBook = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const formData = new FormData();
        formData.append("id", book.id);
        formData.append("name", name);
        formData.append("short_description", desc);
        if(image){
            formData.append("image", image);
        }
        formData.append("publication_date", date);
        formData.append("authors", JSON.stringify(authors));

        await getInstanceAxios()
            .post(backendUrl + "/api/book/update", formData)
            .then((response) => {
                const index = books.findIndex((b) => b.id === response.data.book.id);
                if (index !== -1) {
                    const updatedBooks = [...books];
                    updatedBooks[index] = response.data.book;
                    setBooks(updatedBooks);
                }
                setUpdateDialogOpen(false);
            })
            .catch((error) => {
                setUpdateDialogOpen(false);
                console.log(error);
            });
    };

    const handleUpdateBook = async () => {
        let isDummyFile = image && image.size === 0;

        if(!image){
            isDummyFile = dummyImageFile;
        }

        if (name.trim().length < 3 || !date || authors.length === 0) {
            setIsWarningShown(true);
            return;
        }

        if (!isDummyFile) {
            const allowedFormats = ["image/jpeg", "image/png"];
            if (!allowedFormats.includes(image.type) || image.size > 2 * 1024 * 1024) {
                setIsWarningShown(true);
                return;
            }
        }
        await updateBook();

        setName("");
        setDesc("");
        setDate(null);
        setImage(null);
        setAuthors([]);
        setIsWarningShown(false);
        setUpdateDialogOpen(false);
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

    return (
        <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={updateDialogOpen}>
            <div className="dialog">
                <div className="modal-content">
                    <form encType={'multipart/form-data'}>
                        <Form.Group controlId="name">
                            <Form.Label className={'form-label'}>Name*</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            {isWarningShown && name.trim().length < 3 && (
                                <Form.Text className={'validate-text'} style={{ color: "red" }}>Name must be 3 chars min</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="desc">
                            <Form.Label className={'form-label'}>Description</Form.Label>
                            <Form.Control type="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label className={'form-label'}>Date*</Form.Label>
                            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </Form.Group>

                        {isWarningShown && !date && (
                            <Form.Text id="dateCreateHelper" className={'validate-text'} style={{ color: "red" }}>
                                Date required.
                            </Form.Text>
                        )}

                        <Form.Group controlId="image">
                            <Form.Label className={'form-label'}>Image*</Form.Label>
                            {book.image && (
                                <img className={'form-image'} src={process.env.REACT_APP_BACKEND_URL+`/storage/images/${book.image}`} alt="Image" />
                            )}
                            <Form.Control
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                name="image"
                                onChange={handleImageChange}
                            />
                            {isWarningShown && (!image || image.size > 2 * 1024 * 1024) && (
                                <Form.Text style={{ color: "red" }} className={'validate-text'}>
                                    Image is required (Max: 2 MB, only jpg & png).
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="authorSelect">
                            <Form.Label>Author(s)*</Form.Label>
                            <div id="authorSelect" className="author-select-container" onScroll={handleScroll}>
                                {authorsList.map((author) => (
                                    <div key={author.id}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`author-checkbox-${author.id}`}
                                            label={author.last_name}
                                            value={author.id}
                                            checked={authors.includes(author.id)}
                                            onChange={(e) =>
                                                e.target.checked
                                                    ? setAuthors((prevAuthors) => [...prevAuthors, author.id])
                                                    : setAuthors((prevAuthors) => prevAuthors.filter((id) => id !== author.id))
                                            }
                                        />
                                    </div>
                                ))}
                                {loadingMoreAuthors && <p>Loading more authors...</p>}
                            </div>
                            {isWarningShown && authors.length === 0 && (
                                <Form.Text style={{ color: "red" }} className={'validate-text'}>At least one author must be selected.</Form.Text>
                            )}
                        </Form.Group>
                    </form>
                </div>

                <button type="button" className={"dialog-btn-danger"} onClick={close}>
                    CANCEL
                </button>
                <button type="button" className={"dialog-btn-success"} onClick={handleUpdateBook}>
                    UPDATE
                </button>
            </div>
        </Dialog>
    );
};

export default UpdateBook;
