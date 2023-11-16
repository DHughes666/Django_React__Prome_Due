import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if(loginForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true)

        const data = {
            username: form.username,
            password: form.password,
        };

        axios.post("http://localhost:8000/api/auth/login", data)
        .then((res) => {
            //Registering the account and tokens in the store
        localStorage.setItem("auth", JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user
        }));

        navigate("/")

        }).catch((err) => {
            if(err.message) {
                setError(err.request.response);
            }
        });
        
    }

    return (
        <Form
            id="registration-form"
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    value={form.username}
                    onChange={(e) => setForm({
                        ...form, username: e.target.value
                    })}
                    required
                    type="text"
                    placeholder="Enter username"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    value={form.username}
                    onChange={(e) => setForm({
                        ...form, password: e.target.value
                    })}
                    required
                    type="password"
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required
                </Form.Control.Feedback>
            </Form.Group>

            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    )
}

export default LoginForm;