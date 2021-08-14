import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useLocation } from "wouter";
import { auth } from "../../functions/auth";
import { http } from "../../functions/http";
import { RegisterLoginChildProps } from "../RegisterLogin";

const Register: React.FC<RegisterLoginChildProps> = ({ onError }) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const setLocation = useLocation()[1];

	const onFinish = async (values: auth.RegisterFields) => {
		try {
			setIsLoading(true);
			await auth.register(values);
			setLocation("/login");
		} catch (err: any) {
			if (err instanceof http.HttpError) {
				onError(err.json.message);
			} else if (err instanceof Error) {
				onError("Something went wrong");
				console.error(err.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form form={form} name="Register" onFinish={onFinish}>
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
						type: "email",
					},
				]}
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
					},
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
						type: "string",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.resolve();
							// return Promise.reject(new Error("The two passwords that you entered do not match"));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Register;
