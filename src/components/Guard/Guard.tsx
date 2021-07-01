import React, { ReactChild, ReactChildren, useContext } from "react";
import { Redirect } from "wouter";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../functions/auth";
import { Permission } from "../../models/user";

interface Properties {
	children: ReactChild | ReactChildren;
	adminOnly?: boolean;
}
const redirect = <Redirect href="/login" />;

const Guard: React.FC<Properties> = ({ children, adminOnly = false }) => {
	const userContext = useContext(UserContext);
	if (!auth.hasSession()) {
		return redirect;
	}

	if (adminOnly && !auth.isAdmin(userContext?.user)) {
		return redirect;
	}

	return <>{children}</>;
};

export default Guard;
