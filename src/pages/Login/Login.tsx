import { Button, Form, FormInstance, Input } from "antd";
import { useContext, useRef, useState } from "react";
import { useLocation, Link } from "wouter";
import { auth } from "../../functions/auth";
import { UserContext } from "../../contexts/UserContext";
import { User } from "../../models/user";
import { RegisterLoginChildProps } from "../RegisterLogin";

const Login: React.FC<RegisterLoginChildProps> = ({ onError }) => {

    const [form] = Form.useForm();
    const userContext = useContext(UserContext);
    const [formValid, setFormValid] = useState<boolean>(false);

    const setLocation = useLocation()[1];

    const [istLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = async (values: auth.LoginFields) => {
        try {
            setIsLoading(true);
            const resp: User = await auth.login(values);
            userContext?.setUser(resp);
            setLocation("/");
        } catch (err: any) {
            setIsLoading(false);
            onError(err.json.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        setFormValid(false);
    };

    const onCheck = async () => {
        try {
            await form.validateFields();
            setFormValid(true);
        } catch (errorInfo) {
            setFormValid(false);
        }
    };

    return (

        <div className="Login-form-wrapper">
            <Form
                form={form}
                className="Login-form-wrapper"
                name="Login"
                onChange={onCheck}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email",
                            type: "email"
                        }
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
                            type: "string"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" disabled={!formValid} loading={istLoading}>
                        Submit
                    </Button >
                </Form.Item>
            </Form>
            <Link href="/register">
                Need to Register?
            </Link>
        </div>
    );
};

export default Login;