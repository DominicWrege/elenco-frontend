import React from "react";
import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";
import "./Swagger.css";

const Swagger: React.FC = () => {
	return <SwaggerUI url="/api-spec.yaml" />;
};

export default Swagger;
