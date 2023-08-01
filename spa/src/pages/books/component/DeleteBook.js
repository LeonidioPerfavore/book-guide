import React from "react";
import { Dialog } from "@material-ui/core";
import { getInstanceAxios } from "../../../utils/axios/getInstanceAxios";

const DeleteBook = ({ deleteDialogOpen, setDeleteDialogOpen, book, closeDeleteDialog, setBooks }) => {

    const deleteBook = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        await getInstanceAxios("Content-Type: application/json")
            .delete(backendUrl + "/api/book?id=" + book.id)
            .then((response) => {
                setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
                setDeleteDialogOpen(false);
            })
            .catch((error) => {
                setDeleteDialogOpen(false);
                console.log(error);
            });
    };

    return (
        <Dialog onClose={closeDeleteDialog} aria-labelledby="simple-dialog-title" open={deleteDialogOpen}>
            <div className="dialog">
                <div className="modal-content">
                    <h4>Are you sure you want to delete the book {book.name}?</h4>
                </div>
                <button type="button" className="dialog-btn-success" data-dismiss="modal" onClick={closeDeleteDialog}>
                    CANCEL
                </button>
                <button type="button" className="dialog-btn-danger" data-dismiss="modal" onClick={deleteBook}>
                    DELETE
                </button>
            </div>
        </Dialog>
    );
};

export default DeleteBook;
