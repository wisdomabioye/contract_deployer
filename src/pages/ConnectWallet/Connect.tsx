import React from "react";
import toast from "react-hot-toast";
import { useWeb3React } from "@web3-react/core"
import { useAtom } from "jotai";
import {  border, foreVariant, backVariant } from "store/theme";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { chainIdName, chainIdColor, getAddressExplorerLink, getErrorMessage } from "web3Network/connector";
import ConnectorCards from "components/ConnectorCards";

const ConnectWallet = () => {
  const [borderVariant] = useAtom(border);
  const [text] = useAtom(foreVariant);
  const [bg] = useAtom(backVariant);
  const { chainId = 0, account, deactivate, error } = useWeb3React();
  const toastErrorId = "connectWalletError";
  
  const chainTextColor = chainIdColor[chainId]?.text || "text-light";
  const chainBgColor = chainIdColor[chainId]?.bg || "bg-primary";

  if (error) {
    toast.error(getErrorMessage(error), {id: toastErrorId});
  }

  return (
    <Container className="py-5 my-5">
        {
          account ?
          <Row className="justify-content-center">
            <Col md="5" className="my-2">
              <Card style={{minHeight: "250px"}} bg={bg} text={text} border={borderVariant}>
                <Card.Header className={`${chainBgColor} ${chainTextColor}`}>
                  <h3>{chainIdName?.[chainId] || "Unknown network"}</h3>
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Text as="h4" className="pt-4">
                    <span className={`${chainBgColor} ${chainTextColor}`}>{account}</span>
                  </Card.Text>
                  
                  <Row className="py-4">
                    <Col sm="12" className="my-2">
                      <Card.Text>
                        <CopyToClipboard text={account} onCopy={() => toast.success("Address copied to clipboard")}>
                          <Card.Link className="h5 pointer">
                            Copy Address <FontAwesomeIcon icon={faCopy} /> 
                          </Card.Link>
                        </CopyToClipboard>
                      </Card.Text>
                    </Col>
                    <Col sm="12" className="my-2">
                      <Card.Text>
                        <Card.Link className="h5" target="_blank" rel="noreferrer" href={getAddressExplorerLink(account, chainId)}>
                          View on explorer
                        </Card.Link>
                      </Card.Text>
                    </Col>
                  </Row>
                  
                  <Card.Text>
                    <Button variant={`outline-${text}`} onClick={() => deactivate()}>
                      Disconnect Wallet
                    </Button>
                  </Card.Text>

                </Card.Body>
              </Card>
            </Col>
          </Row>
          :
          <ConnectorCards />
        }
      
    </Container>
  )
}

export default ConnectWallet;
