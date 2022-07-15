import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, FormCheck, Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { cutAddress } from "utils/address";
import { useAtom } from "jotai";
import { isDark, CText } from "store/theme";
import { appInfo } from "app.config";

const TopNav = () => {
	const [notLight, setTheme] = useAtom(isDark);
	const [text] = useAtom(CText);
	const { account } = useWeb3React();
	const { title } = appInfo;

	const handleTheme = () => setTheme(!notLight);

	return (
		<Container>
			<Row className="py-3 d-flex align-items-center">
				<Col xs={4}>
					<h1 className="fs-2">
						<Link className={`text-decoration-none ${text}`} to="/">{title}</Link>
					</h1>
				</Col>
				<Col className="text-end">
					<FormCheck
						type="switch"
						onChange={handleTheme}
						checked={!notLight}
						title="Theme"
						className="d-inline-block me-3 my-1"
					/>
		
					<Button as={Link as any} to="/connect">
						{
							account ?
							cutAddress(account) :
							"Connect Wallet"
						}
					</Button>
				
				</Col>
			</Row>
		</Container>	
	)
}

export default TopNav;