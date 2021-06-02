import React, { ReactChild, ReactChildren, useContext } from "react";
import { Redirect } from "wouter";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../functions/auth";


interface Properties {
    children: ReactChild | ReactChildren
}

const Guard: React.FC<Properties> = ({ children }) => {

    const userContext = useContext(UserContext);

    if (!auth.hasSession()) {
        return <Redirect href="/login" />;
    }

    return <>{children}</>;
};

export default Guard;