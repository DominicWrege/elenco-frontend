import { Button, Divider, Form, FormInstance, Input } from "antd";
import { useContext, useRef, useState } from "react";
import { useLocation, Link } from "wouter";
import { auth } from "../../functions/auth";
import { UserContext } from "../../contexts/UserContext";
import { User } from "../../models/user";
import { RegisterLoginChildProps } from "../RegisterLogin";



const Login: React.FC<RegisterLoginChildProps> = ({ onError }) => {

    const form = useRef<FormInstance | null>(null);
    const userContext = useContext(UserContext);

    const [formValid, setFormValid] = useState<boolean>(false);
    const setLocation = useLocation()[1];
    const [istLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = async (values: auth.LoginFields) => {
        try {
            setIsLoading(true);
            const resp: User = await auth.login(values);
            // console.log(resp);
            userContext?.setUser(resp);
            setLocation("/");
        } catch (err: any) {
            setIsLoading(false);
            // console.log(err.json.message);
            onError(err.json.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setFormValid(false);
    };
    const onCaptures = () => {
        form.current?.validateFields(["email", "password"]).then((fields: auth.LoginFields) => {
            setFormValid(fields.email !== undefined && fields.password !== undefined);
        }).catch(() => {
            setFormValid(false);
        });
    };
    return (

        <div className="Login-form-wrapper">
            <Form
                ref={form}
                className="Login-form-wrapper"
                name="Login"
                onChange={onCaptures}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    className="das"
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item
                    className="das"
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
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
            {/* {// copy from githu msg} */}
        </div>



    );
};

export default Login;