import React, { ReactChild, ReactChildren } from "react";
import { Redirect } from "wouter";
import { auth } from "../../functions/auth";


interface Properties {
    children: ReactChild | ReactChildren
}

const Guard: React.FC<Properties> = ({ children }) => {


    if (!auth.hasSession()) {
        return <Redirect href="/login" />;
    }

    return <>{children}</>;
};

export default Guard;