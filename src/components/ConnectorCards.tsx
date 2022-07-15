import React from "react";
import { useWeb3React } from "@web3-react/core"
import { Col, Row, Image, Button, Card } from "react-bootstrap";
import { injected, walletconnect } from "web3Network/connector";
import { useAtom } from "jotai";
import {  border, foreVariant, backVariant } from "store/theme";

import MetamaskSvg from "assets/img/wallet/metamask.svg";
import TrustWalletSvg from "assets/img/wallet/trustwallet.svg";
import WalletConnectSvg from "assets/img/wallet/walletconnect.svg";

const connectorsList = [
  {
    title: "Metamask",
    subtitle: "Metamask and the likes",
    buttonText: "Use Metamask",
    image: MetamaskSvg,
    connector: injected
  },
  {
    title: "Wallet Connect",
    subtitle: "Most mobile wallets",
    buttonText: "Use Walletconnect",
    image: WalletConnectSvg,
    connector: walletconnect
  },
  {
    title: "Trust Wallet",
    subtitle: "Binance Trust Wallet",
    buttonText: "Use Trustwallet",
    image: TrustWalletSvg,
    connector: injected
  }
]

const ConnectCards = () => {
  const [borderVariant] = useAtom(border);
  const [text] = useAtom(foreVariant);
  const [bg] = useAtom(backVariant);
  
  const context = useWeb3React();
  const { connector, activate } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector])

  return (
      <Row className="justify-content-center">
        <h4 className="text-center py-2">Connect Web3 Wallet</h4>
        {connectorsList.map(({title, subtitle, image, connector, buttonText}) => (
          <Col md="4" xl="3" className="my-2" key={title}>
            <Card style={{minHeight: "250px"}} bg={bg} text={text} border={borderVariant}>
              <Card.Body className="text-center">
                <Image src={image} style={{minHeight: "90px"}} width="50px" alt={title} />
                <Card.Title as="h5" className="pt-3 py-2">{title}</Card.Title>
                <Card.Subtitle className="text-muted pb-4">{subtitle}</Card.Subtitle>
                
                <Card.Text>
                  <Button 
                    variant="primary"
                    className="mb-3" 
                    disabled={activatingConnector ? true : undefined}
                    onClick={
                      () => {
                        setActivatingConnector(connector);
                        activate(connector);
                      }
                    }
                   >
                    {buttonText}
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
   )
}

export default ConnectCards;