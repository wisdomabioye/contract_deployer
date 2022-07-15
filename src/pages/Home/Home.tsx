import React from "react";
import EvmContractDeployer from "components/Deployer/Evm";
import { Container, Row, Col } from "react-bootstrap";
import { appInfo } from "app.config";

const HomePage = () => {
	const { subtitle, description } = appInfo;

	return (
		<Container>
			<Row>
				<Col md={12} className="text-center mb-5">
					<h1 className="py-1 h3">{subtitle}</h1>
					<h2 className="h6">{description}</h2>
				</Col>
			</Row>
			
			<EvmContractDeployer />
		</Container>
	)
}

export default HomePage;