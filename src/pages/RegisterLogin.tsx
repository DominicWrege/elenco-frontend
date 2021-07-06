import { Alert, Card } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import MiddleCenter from "../components/Styles/shared.css";
import Login from "./Login/Login";
import Register from "./Register/Register";

export const RegisterLoginForm = styled.div`
	padding: 0 2rem;
	width: 100%;

	input: {
		width: 15em !important;
	}
	form .ant-row {
		display: grid;
		grid-template-columns: 8rem 1fr;
		grid-column-gap: 0.5rem;
	}

	form .ant-col.ant-form-item-control {
		grid-column-start: 2;
	}
	form .ant-form-item-control-input-content {
		display: inherit;
		display: flex;
		justify-content: flex-end;
	}
	form .ant-col.ant-form-item-label {
		display: flex;
	}
`;

const cardStyle = {
	width: "100%",
	maxWidth: "34rem",
};

export const ErrorDiv = styled.div`
	margin-bottom: 1.25rem;
`;

export enum ComponentType {
	Login = "Login",
	Register = "Register",
}

interface Props {
	component: ComponentType;
}

export interface RegisterLoginChildProps {
	onError: (string) => void;
}

const RegisterLogin: React.FC<Props> = ({ component }) => {
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	const onError = (message: string): void => {
		setErrorMsg(message);
	};
	const renderChild = (): JSX.Element => {
		if (component === ComponentType.Login) {
			return <Login onError={onError} />;
		}
		return <Register onError={onError} />;
	};

	return (
		<MiddleCenter>
			<Card title={component} style={cardStyle}>
				<RegisterLoginForm>
					<ErrorDiv hidden={errorMsg === null}>
						<Alert message={errorMsg} type="error" showIcon />
					</ErrorDiv>
					{renderChild()}
				</RegisterLoginForm>
			</Card>
		</MiddleCenter>
	);
};

export default RegisterLogin;
