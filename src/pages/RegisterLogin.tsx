import { Alert, Card, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import MiddleCenter from "../components/Styles/shared.css";
import Login from "./Login/Login";
import Register from "./Register/Register";

export const RegisterLoginForm = styled.div`
    width: 100%;
    min-width: 300px;
    max-width: 900px;
    input: {
        width: 15em !important;
    }
`;

const cardStyle = {
    width: "100%",
    minWidth: "320px",
    maxWidth: "34rem"
}

export const ErrorDiv = styled.div`
    margin-bottom: 1.25rem;
`;

export enum ComponentType {
    Login = "Login",
    Register = "Register"
}

interface Props {
    component: ComponentType
}


export interface RegisterLoginChildProps {
    onError: (string) => void
}

const RegisterLogin: React.FC<Props> = ({ component }) => {

    const [errorMsg, setErrorMsg] = useState<null | string>(null)

    const onError = (message: string): void => {
        setErrorMsg(message);

    };
    const renderChild = (): JSX.Element => {
        if (component === ComponentType.Login) {
            return <Login onError={onError} />
        }
        return <Register onError={onError} />
    }

    return (
        <MiddleCenter>
            <Card title={component} style={cardStyle}>
                <RegisterLoginForm >
                    <ErrorDiv hidden={errorMsg === null}>
                        <Alert message={errorMsg} type="error" showIcon />
                    </ErrorDiv>
                    {renderChild()}
                </RegisterLoginForm>
            </Card>
        </MiddleCenter >
    );
}

export default RegisterLogin;