import { Button, Divider, Form, FormInstance, Input } from "antd";
import { useContext, useRef, useState } from "react";
import { useLocation } from "wouter";
import { auth } from "../../functions/auth";
import { UserContext } from "../../contexts/UserContext";
// eslint-disable-next-line
import { http } from "../../functions/http";



const Login: React.FC = () => {

    const form = useRef<FormInstance | null>(null);
    const userContext = useContext(UserContext);

    const [formValid, setFormValid] = useState<boolean>(false);
    const setLocation = useLocation()[1];
    const [istLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = async (values: auth.LoginFields) => {
        try {
            setIsLoading(true);
            userContext?.setUser(await auth.login(values));
            setLocation("/");
        } catch (err: http.HttpError | any) {
            setIsLoading(false);
            console.log(err);
            console.log(err.statusCode);
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
                <Divider />

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
            {/* <Link href="/login">Login</Link> */}
        </div>



    );
};

export default Login;