import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useLocation } from "wouter";
import { auth } from "../../functions/auth";
import { RegisterLoginChildProps } from "../RegisterLogin";

const Register: React.FC<RegisterLoginChildProps> = ({ onError }) => {

    const [form] = Form.useForm();
    const [formValid, setFormValid] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setLocation = useLocation()[1];


    const onFinish = async (values: auth.RegisterFields) => {
        try {
            console.log(values);
            setIsLoading(true);
            setFormValid(true);
            await auth.register(values);
            setLocation("/login");

        } catch (err: any) {
            setIsLoading(false);
            setFormValid(false);
            console.log(err);

            // console.log(err.json.message);
            // onError(err.json.message);
        }
    };

    const onFinishFailed = (_: any) => {
        // setFormValid(false);
        console.log("fail");
    };

    return (
        <Form
            form={form}
            name="Register"
            onFinish={onFinish}
            // onFieldsChange={onCheck}
            onFinishFailed={onFinishFailed}
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please enter your email",
                        type: "email"
                    }]}
            >
                <Input type="email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password",
                        type: "string",
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Repeat Password"
                name="passwordCheck"
                rules={[
                    {
                        required: true,
                        message: "Please reenter your password",
                        type: "string"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.resolve();
                            // return Promise.reject(new Error("The two passwords that you entered do not match"));
                        },
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" disabled={!formValid} loading={isLoading}>
                    Register
                </Button>
            </Form.Item>
        </Form >
    );
}

export default Register;
