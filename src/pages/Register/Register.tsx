import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { RegisterLoginChildProps } from "../RegisterLogin";

const Register: React.FC<RegisterLoginChildProps> = ({ onError }) => {


    // onError -> when register failed

    return (
        <Form
            name="Register"
            initialValues={{ remember: true }}
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Repeat Password"
                name="password-repeat"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
          </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;