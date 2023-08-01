import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { Form } from "react-bootstrap";

const DialogComponent = ({ open, onClose, actionOption, cancelOption, author, updateAuthor, deleteAuthor, setAuthor, createAuthor }) => {
    const [firstName, setFirstName] = useState(""); // Initialize with an empty string
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isWarningShown, setIsWarningShown] = useState(false);

    const handleFirstNameChange = (event) => {
        const { value } = event.target;
        const regex = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0500-\u052F]*$/;
        if (regex.test(value)) {
            setFirstName(value);
            setAuthor((prevAuthor) => ({ ...prevAuthor, first_name: value }));
        }
    };

    const handleLastNameChange = (event) => {
        const { value } = event.target;
        const regex = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0500-\u052F]*$/;
        if (regex.test(value)) {
            setLastName(value);
            setAuthor((prevAuthor) => ({ ...prevAuthor, last_name: value }));
        }
    };

    const handleMiddleNameChange = (event) => {
        const { value } = event.target;
        const regex = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0500-\u052F]*$/;
        if (regex.test(value)) {
            setMiddleName(value);
            setAuthor((prevAuthor) => ({ ...prevAuthor, middle_name: value }));
        }
    };

    const handleCancel = () => {
        // resetFields();
        onClose();
    };

    const handleCancel2 = () => {
        onClose();
    }

    const resetFields = () => {
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setIsWarningShown(false);
    };

    const handleSaveOrDelete = () => {
        if (actionOption["btn-text"] === "DELETE") { // Если действие - "Удаление"
            deleteAuthor();
        } else if (actionOption["btn-text"] === "CREATE") { // Если действие - "Создание"
            const newAuthor = {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
            };

            if (isFieldsValid(newAuthor)) {
                createAuthor(newAuthor);
            } else {
                setIsWarningShown(true);
            }
        } else { // В противном случае, действие - "Обновление"
            const updatedAuthor = {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
            };

            if (isFieldsValid(updatedAuthor)) {
                updateAuthor(updatedAuthor);
            } else {
                setIsWarningShown(true);
            }
        }
    };


    // Проверка валидности полей
    const isFieldsValid = (author) => {
        const { first_name, last_name, middle_name } = author;
        if(!first_name || first_name && first_name.length < 3){
            return false;
        }
        if(!last_name || last_name && last_name.length < 3){
            return false;
        }
        return !(middle_name && middle_name && middle_name.length < 3);
    };

    useEffect(() => {
        // Заполняем поля значениями автора при его наличии
        if (author) {
            setFirstName(author.first_name);
            setLastName(author.last_name);
            setMiddleName(author.middle_name || ""); // Может быть пустым, поэтому обрабатываем отдельно
            setIsCreating(false); // Если передан существующий автор, устанавливаем false для isCreating
        } else {
            // Если нет автора, устанавливаем поля пустыми и устанавливаем true для isCreating
            resetFields();
            setIsCreating(true);
        }
    }, [author]);

    return (
        <Dialog onClose={actionOption["btn-text"] === "DELETE" ? handleCancel : handleCancel2} aria-labelledby="simple-dialog-title" open={open}>
            <div className="dialog">
                <div className="modal-content">
                    {actionOption["btn-text"] === "DELETE" ? (
                        <h4>
                            Are you sure you want to delete the author{" "}
                            {author ? author.first_name + " " + author.last_name : ""}?
                        </h4>
                    ) : (
                        <div>
                            <Form.Label htmlFor="inputPassword5">First name</Form.Label>
                            <Form.Control
                                type="text"
                                id="firstName"
                                aria-describedby="firstNameHelper"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            {isWarningShown && !firstName || isWarningShown && firstName && firstName.length < 3 ?
                                <Form.Text id="nameCreateBookHelper" className={'validate-text'} style={{ color: "red" }}>
                                    firstName must be 3 chars min
                                </Form.Text>
                                : null}

                            <Form.Label htmlFor="inputPassword5">Last name</Form.Label>
                            <Form.Control
                                type="text"
                                id="lastName"
                                aria-describedby="lastNameHelper"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            {isWarningShown && !lastName || lastName && lastName.length < 3 ?
                                <Form.Text id="nameCreateBookHelper" className={'validate-text'} style={{ color: "red" }}>
                                    lastName must be 3 chars min
                                </Form.Text> : null
                            }

                            <Form.Label htmlFor="inputPassword5">Middle name</Form.Label>
                            <Form.Control
                                type="text"
                                id="middleName"
                                aria-describedby="middleNameHelper"
                                value={middleName}
                                onChange={handleMiddleNameChange}
                            />
                            {isWarningShown && middleName && middleName.length < 3 ?
                                <Form.Text id="nameCreateBookHelper" className={'validate-text'} style={{ color: "red" }}>
                                    middleName must be 3 chars min
                                </Form.Text> : null
                            }
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className={cancelOption["btn-class"]}
                    data-dismiss="modal"
                    onClick={actionOption["btn-text"] === "DELETE" ? handleCancel : handleCancel2}>
                    CANCEL
                </button>
                <button
                    type="button"
                    className={actionOption["btn-class"]}
                    data-dismiss="modal"
                    onClick={handleSaveOrDelete}
                >
                    {actionOption["btn-text"]}
                </button>
            </div>
        </Dialog>
    );
};

export default DialogComponent;
