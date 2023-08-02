import Header from "../../components/header/Header";
import React from "react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getInstanceAxios} from "../../utils/axios/getInstanceAxios";
import {Spinner} from "react-bootstrap";

const Book = () => {

    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [preloader, setPreloader] = useState(true);

    const getBook = async () => {
        setPreloader(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/book/'+id);
            setBook(response.data.book);
            console.log(response.data.book)
            setPreloader(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div>

            <Header />
            {preloader
                ?
                <div className={'preloader-wrapper'}>
                    <Spinner animation="grow" variant="info" />
                </div>
                :
                <div>
                    <h1 className={'main-header'}>
                        Book: {book.name}
                    </h1>

                    <div className="grid-container ">
                        <div className="centered-text">
                        <img className={'info-image'} src={process.env.REACT_APP_BACKEND_URL+`/storage/images/${book.image}`} alt="Image" />
                        <h4>Authors: </h4>
                        {book.authors ? (
                            book.authors.map((author, key) => (
                                <h4 key={key}>
                                    {author.first_name} {author.middle_name ? author.middle_name : ""} {author.last_name}
                                </h4>

                            ))
                        ) : (
                            <h4 align={'center'} className={'mt-4'}>There are no authors!</h4>
                        )}
                        <pre>
                            {book.short_description ? book.short_description : ''}
                        </pre>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default Book;