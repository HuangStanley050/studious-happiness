import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { login } from "../store/actions/authActions";

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
const Login = ({ isAuth, loginStart }) => {
  const [form, handleChange, resetFields] = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    loginStart(form);
    resetFields();
  };
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
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

Login.propTypes = {
  loginStart: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({ isAuth: state.auth.isAuth });
const mapDispatchToProps = dispatch => ({
  loginStart: userInfo => dispatch(login(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
