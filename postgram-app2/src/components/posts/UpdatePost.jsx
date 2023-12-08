import { useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import Toaster from "../Toaster";

const UpdatePost = ({post, refresh}) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        author: post.author.id,
        body: post.body,
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatePostForm = e.currentTarget;

        if (updatePostForm.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: post.author,
            body: form.body
        }

        axiosService.post(`/post/${post.id}/`, data)
        .then(() => {
            handleClose();
            setToastMessage("Post updated 🚀")
            setToastType("success");
            setForm({})
            setShowToast(true);
            refresh();
        })
        .catch((error) => {
            setToastMessage("An error occurred.")
            setToastType("danger");
        })
    }

    return (
        <>
            <Dropdown.Item onClick={handleShow}>
                Modify
            </Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit}
                        data-testid="update-post-form"
                    >
                        <Form.Group className="mb-3">
                            <Form.Control 
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({...form,
                                body: e.target.value
                                })}
                                as="textarea"
                                rows={3}
                                data-testid="post-body-field"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    data-testid="update-post-submit"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={form.body === undefined}
                    >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster 
                title="Post!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}

export default UpdatePost;