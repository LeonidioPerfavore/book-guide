import React from "react";
import {useState} from "react";
import DeleteBook from "./DeleteBook";
import UpdateBook from "./UpdateBook";
import {useNavigate} from "react-router-dom";

export const List = ({books, setBooks}) => {

    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const getBook = (id) => {
        let book = books.find((x) => Number(x.id) === Number(id));
        setBook(book);
    }

    const openUpdateDialog = (e) => {
        getBook(e.target.id)
        setUpdateDialogOpen(true);
    }
    const openDeleteDialog = (e) => {
        getBook(e.target.id)
        setDeleteDialogOpen(true);
    }
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
    }
    const closeUpdateDialog = () => {
        setUpdateDialogOpen(false);
    }

    const showAuthors = (bookAuthors) => {
        const firstAuthor = bookAuthors[0];
        return `${firstAuthor.first_name.charAt(0)}. ${firstAuthor.last_name}`;
    }

    const navigateToBook = (e) => {
        let bookId = e.currentTarget.id;
        navigate('/book/'+bookId)
    };

    return (
        <div>
            <div className={'book-wrapper'}>

            {books && books.length ? (
                books.map((book, key) => (
                        <div className="book" key={key}>
                            <div className="book-author">{showAuthors(book.authors)}</div>
                            <div className="book-title">{book.name}</div>
                            <div className="book-image">
                                <img src={process.env.REACT_APP_BACKEND_URL+`/storage/images/${book.image}`} alt="Image" />
                            </div>
                            <div className="book-author">
                                <span className={'update-book-icon book-icon'} id={book.id} onClick={openUpdateDialog}>Update</span>
                                <span className={'delete-book-icon book-icon'} id={book.id} onClick={openDeleteDialog}>Delete</span>
                            </div>
                            <div className="vertical-title" onClick={navigateToBook} id={book.id}>{book.name}</div>
                        </div>
                ))
            ) : (
                <h4 align={'center'} className={'mt-4'}>There are no books!</h4>
            )}

            </div>

            {deleteDialogOpen ?
                <DeleteBook
                    deleteDialogOpen={deleteDialogOpen}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    book={book}
                    closeDeleteDialog={closeDeleteDialog}
                    setBooks={setBooks}
                />
                : null}

            {updateDialogOpen ?
                <UpdateBook
                    updateDialogOpen={updateDialogOpen}
                    setUpdateDialogOpen={setUpdateDialogOpen}
                    book={book}
                    books={books}
                    closeUpdateDialog={closeUpdateDialog}
                    setBooks={setBooks}
                />
                : null}


        </div>
    );
};

export default List;
