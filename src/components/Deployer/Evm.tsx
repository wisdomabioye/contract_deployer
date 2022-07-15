import React from "react";
import toast from "react-hot-toast";
import EvmContractModules from "contracts/evm";
import CodePreview from "components/CodePreview";
import { useWeb3React } from "@web3-react/core";
import {  Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { getTransactionExplorerLink, getAddressExplorerLink } from "web3Network/connector";
import { makeApiRequest } from "utils/network";
import { delay, onlyAlphaNumeric } from "utils/functions";
import {  evmContractsMap, verifySoliditySourceCodeUrl } from "app.config";
import { DeployData } from "types";

// const deploymentAlert = "Optional: After deployment we can verify the contract source code on block explorer. If you want this, you need to get the free  api key from the appropriate block explorer website.";
const DEFAULT_COMPILE_OPTIONS = {
    optimize: true,
    runs: 200,
    abi: "0",
    evmVersion: "byzantium",
}
const SOLIDITY_VERSION = "v0.8.15+commit.e14f2714";

export default function EvmSolidityContractDeployer() {
    const [deploying, setDeploying] = React.useState<boolean>(false);
    const [verifying, setVerifying] = React.useState<boolean>(false);
    const [verifyMessage, setVerifyMessage] = React.useState<string>("");
    const [verificationGuid, setVerificationGuid] = React.useState<string>("");
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [deployData, setDeployData] = React.useState<Partial<DeployData>>({});
    const [chosenContract, setChosenContract] = React.useState<string>(evmContractsMap[0].module);
    const [contractData, setContractData] = React.useState<any>({});
	const { account, chainId, library } = useWeb3React();

    const contractModule = EvmContractModules[chosenContract];
    const contractName = onlyAlphaNumeric(contractData?.name || "");
	const contractCode = contractModule?.contractCode(contractName) || "/* Select a contract type */";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setContractData({...contractData, [name]: value});
	}

    const validateContractFields = () => {
        contractModule.contractFields.forEach(({name, label}: {name: string, label: string}) => {
            if (!contractData[name]) {
                throw new Error(`Please fill in the ${label}`);
            }
        })
    }

    const compileWithWorker = async (data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const worker = new Worker("/solcompiler.worker.js");
            worker.postMessage(data);
            worker.onmessage = (event: any) => resolve(event.data);
            worker.onerror = reject;
        });
    }

	const handleDeploy = async (): Promise<void> => {
        setErrorMessage("");   
        setDeploying(true);
        setDeployData(prev => ({...prev, contractAddress: "", transactionHash: ""}));

		try {
            if (!account) throw new Error("Please connect a wallet");
            if (!contractModule) throw new Error("Please select a contract type");
            validateContractFields();
    
            // compile and deploy the contract
            const data = {source: contractCode, options: {...DEFAULT_COMPILE_OPTIONS, include: contractName}};
            const result = await compileWithWorker(data);

            if (result.errors) { 
                throw new Error(result.errors.map((e: any) => e.message).join("\n"));
            }


            const bytecode = result[contractName].evm.bytecode.object;
            // console.log("bytecode", bytecode);
            const constructorArgumentValues = contractModule.contractFields.map(({name}: {name: string}) => contractData[name]); 
            const constructorArgumentTypes = contractModule.contractFields.map(({solType}: {solType: string}) => solType);
            const constructorArgumentsEncoded = library.eth.abi.encodeParameters(constructorArgumentTypes, constructorArgumentValues).substring(2); //encode and remove the 0x prefix

            const deployOption = {
                data: bytecode + constructorArgumentsEncoded,
                arguments: constructorArgumentValues, // constructor arguments
            }

            const contractInstance = new library.eth.Contract([]);

            await new Promise((resolve, reject) => {
                contractInstance.deploy(deployOption).send({from: account})
                .on("transactionHash", (transactionHash: string) => {
                    // console.log("transactionHash", transactionHash);
                    setDeployData(prev => ({...prev, transactionHash}));
                })
                .on("receipt", (receipt: any) => {
                    // console.log("receipt", receipt);
                    const { contractAddress, transactionHash } = receipt;
                    setDeployData({
                        ...deployData,
                        contractAddress,
                        chainId,
                        contractCode,
                        contractName,
                        transactionHash,
                        constructorArgs: constructorArgumentsEncoded,
                        deployed: true, // this is a flag to indicate that the contract has been deployed      
                    });
                    resolve(true);
                })
                .on("error", (error: any) => {
                    reject(error);
                })
            })
            
            toast.success("Contract deployed successfully. You can verify the source code below");
        
        } catch (err: any) {
            setErrorMessage(err.message);
            console.log(err);
            toast.error(err.message);
        } finally {
            setDeploying(false);
        }
	}

    const checkVerificationStatus = (guid: string): Promise<any> => {
        // setTimeout to check contract verification status after 30 seconds
        return delay(30000).then(async () => {
            const { url, apiKey } = verifySoliditySourceCodeUrl[deployData.chainId as any];
            const reqOption = {
                apikey: apiKey,
                guid,
                module: "contract",
                action: "checkverifystatus",
            }

            const response = await makeApiRequest({url, method: "GET", body: reqOption});
            console.log("response", response);
        
            setVerifyMessage(response.result);
        
            if (response.status === "1") {
                toast.success("Source code verification successful");
            } else if (response.result === "Pending in queue") {
                toast.success("Pending verification");
                return checkVerificationStatus(guid);
            } else {
                toast.success("Please use the link above to check the contract address on block explorer");
            }
        })
        
    }

	const verifySourceCode = async (): Promise<void> => {
        setVerifying(true); 
        setVerificationGuid("");
        setVerifyMessage("");

        try {
            const { url, apiKey } = verifySoliditySourceCodeUrl[deployData.chainId as any];

            const verifyOption = {
                module: "contract",
                action: "verifysourcecode",
                codeformat: "solidity-single-file", // default
                licenseType: 3, // default to MIT license  
                apikey: apiKey, 
                contractaddress: deployData.contractAddress,
                constructorArguements: deployData?.constructorArgs ?? "",
                contractname: deployData.contractName,
                sourceCode: deployData.contractCode,
                compilerversion: SOLIDITY_VERSION,
                evmversion: DEFAULT_COMPILE_OPTIONS.evmVersion,
                optimizationUsed: Number(DEFAULT_COMPILE_OPTIONS.optimize),
                runs: DEFAULT_COMPILE_OPTIONS.runs,
            }

            // console.log("verifyOption.constructorArguements: ", verifyOption.constructorArguements)
           
            const response = await makeApiRequest({
                url,
                method: "POST",
                body: verifyOption,
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            });

            // console.log("response", response);

            if (response.status === "1") {
                // response.result is the guid to check the verification status
                setVerificationGuid(response.result);
                await checkVerificationStatus(response.result);
            } else {
                setVerifyMessage(response.result);
                toast.error(response.result);
            }

        } catch (err: any) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setVerifying(false);
        }
    }
	
    const readyToVerify = deployData.deployed;

    return (
        <Row className="justify-content-center">
            <Col md={4}>
                <Form.Label>Select a contract type</Form.Label>
                <Form.Select
                    className="mb-3" 
                    value={chosenContract} 
                    onChange={e => setChosenContract(e.target.value)}>
                    {
                        evmContractsMap.map(({module, name}: {module: string, name: string}) => (
                            <option 
                                key={module} 
                                value={module}>
                                {name}
                            </option>
                        ))
                    }
                </Form.Select>
                
                {
                    contractModule ? 
                    <React.Fragment>
                        {
                            contractModule.contractFields.map(({name, label, type, placeholder}: {name: string, label: string, type: string, placeholder: string}) => (
                                <Form.Group className="pb-3" key={name}>
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control type={type} 
                                        placeholder={placeholder}
                                        onChange={handleChange}
                                        name={name}
                                        value={contractData[name] || ""}
                                    />
                                </Form.Group>
                            ))
                        }

                        <Button 
                            className="mt-3" 
                            onClick={handleDeploy}
                            disabled={deploying || undefined}>
                           {
                                deploying ?
                                <><Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> Deploying...</>
                                :
                                "Deploy"
                           }
                            
                        </Button>
                        
                            {
                                errorMessage &&
                                <Alert variant="danger" className="mt-3">
                                    {errorMessage}
                                </Alert>
                            }
                       
                        
                        <div>
                           {
                            deployData.transactionHash &&
                            <p className="my-2 text-break">Transaction:&nbsp;  
                                <a 
                                    href={getTransactionExplorerLink(deployData.transactionHash, chainId as any)} 
                                    target="_blank"
                                    rel="noreferrer">
                                    {deployData.transactionHash}
                                </a> 
                            </p>
                           }
                           {
                            deployData.contractAddress &&
                            <p className="my-2 text-break">Contract Address:&nbsp;  
                               <br/> <a 
                                    href={getAddressExplorerLink(deployData.contractAddress, chainId as any)} 
                                    target="_blank"
                                    rel="noreferrer">
                                    {deployData.contractAddress}
                                </a> 
                            </p>
                           }

                        </div>
                        <hr />

                        <Button
                            className="mt-3" 
                            onClick={verifySourceCode}
                            disabled={(!readyToVerify || verifying) ?? undefined}>
                            {
                                verifying ?
                                <><Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> Verifying...</>
                                :
                                "Verify source code"
                           }
                            
                        </Button>
                        {   
                           (verificationGuid || verifyMessage) &&
                            <p className="py-2">{verificationGuid} =&gt; {verifyMessage}</p>
                        }
                    </React.Fragment>
                    :
                    <p> Contact us to add new contract. We'll make it available in the shortest time possible.<br/>
                        You can also send a pull request to add new contract. <a href="https://github.com/wisdomabioye/contract_deployer">View on Github</a>
                    </p>
                }
            </Col>

            <Col md={8} className="my-3">
                {/* API key section  for contract verification */}

                {
                    contractModule &&
                    <Alert variant="info">{contractModule.description}</Alert>
                }
                <CodePreview code={contractCode} />
            </Col>
        </Row>

    )
}