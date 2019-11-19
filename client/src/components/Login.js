import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const useForm = () => {
  const [form, setValue] = useState({
    email: "",
    password: ""
  });
  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const resetFields = () => {
    setValue({
      ...form,
      email: "",
      password: ""
    });
  };

  return [form, handleChange, resetFields];
};
const Login = props => {
  const [form, handleChange, resetFields] = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div
      style={{
        height: "60vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Email"
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Form.Input
            placeholder="Password"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button content="Submit" />
      </Form>
    </div>
  );
};

export default Login;
