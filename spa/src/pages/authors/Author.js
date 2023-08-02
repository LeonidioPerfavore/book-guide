import Header from "../../components/header/Header";
import React from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getInstanceAxios} from "../../utils/axios/getInstanceAxios";
import {useState} from "react";
import {Spinner} from "react-bootstrap";

const Author = () => {

    const {id} = useParams();
    const [author, setAuthor] = useState(null);
    const [preloader, setPreloader] = useState(true);

    const getAuthor = async () => {
        setPreloader(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await getInstanceAxios("Content-Type: application/json").get(backendUrl + '/api/author/'+id);
            setAuthor(response.data.author);
            setPreloader(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAuthor();
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
                <h1 className={'main-header'}>
                    Author: {author.first_name} {author.middle_name ? author.middle_name : ' '} {author.last_name}
                </h1>}


        </div>
    )
};

export default Author;