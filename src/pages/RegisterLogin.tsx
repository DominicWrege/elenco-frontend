import { Card } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import MiddleCenter from "../components/Styles/shared.css";
import Login from "./Login./Login";
import Register from "./Register/Register";

export const RegisterLoginForm = styled.div`
    width: 100%;
    max-width: 440px;

    color: red !important;
    input: {
        width: 30px !important;
    }
`;

export enum ComponentType {
    Login = "Login",
    Register = "Register"
}

interface Props {
    component: ComponentType
}

const RegisterLogin: React.FC<Props> = ({ component }) => {

    const renderChild = (): JSX.Element => {
        if (component === ComponentType.Login) {
            return <Login />
        }
        return <Register />
    }

    return (
        <MiddleCenter>
            <div>
                <RegisterLoginForm >
                    <div>
                        <h2>{component}</h2>
                        {renderChild()}
                    </div>
                </RegisterLoginForm>
            </div>
        </MiddleCenter>
    );
}

export default RegisterLogin;