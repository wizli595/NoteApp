import { Link, useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { login, UserInfo } from "../Api/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../app/hooks/useAuth";
import { formatError } from "../utils/formatError";

export interface ErrorResponse {
  message: string;
}

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogin,userAgent } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      handleLogin(data);
      toast.success("Logged in successfully!!");
      await navigate({ to: "/" });
    },
    onError: (err: unknown) => {
     formatError(err);
    },
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prv) => ({ ...prv, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({...loginInfo,userAgent});
  };
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              type="email"
              placeholder={"Enter Email..."}
              name="email"
              value={loginInfo.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder={"Enter Password..."}
              name="password"
              value={loginInfo.password}
              onChange={changeHandler}
            />
          </Form.Group>
          <Button
            disabled={isPending}
            type="submit"
            variant="primary"
            className="mt-2"
          >
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer? <Link to={"/"}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginPage;
