import React from "react";
import {useNavigate} from "react-router-dom";

const AuthorList = ({ authors, openDeleteDialog, openEditDialog }) => {

    const navigate = useNavigate();

    const shortenLongName = (name) => {
        if (name.length > 9) {
            return name.charAt(0) + ".";
        } else {
            return name;
        }
    }

    const navigateToAuthorInfo = (e) => {
        let authorId = e.currentTarget.id;
        navigate('/author/'+authorId)
    };

    return (
        <ul className={'authors-list'}>
            {authors && authors.length ? (
                authors.map((author, key) => (
                    <li className="author-item" key={key}>
                        <div className="description">
                            <h3>
                                {shortenLongName(author.first_name)} {author.middle_name ? shortenLongName(author.middle_name) : ""} {author.last_name}
                                <br />
                                <span className={'author-icon book-icon'} id={author.id} onClick={openEditDialog}>UPDATE</span>
                                <span className={'author-icon delete-icon'} id={author.id} onClick={openDeleteDialog}>DELETE</span>
                                <span className={'author-icon book-icon'} id={author.id} onClick={navigateToAuthorInfo}>INFO</span>

                            </h3>
                        </div>
                    </li>
                ))
            ) : (
                <h4 align={'center'} className={'mt-4'}>There are no authors!</h4>
            )}
        </ul>
    );
};

export default AuthorList;
