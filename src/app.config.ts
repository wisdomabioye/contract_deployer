import { ChainId, ChainIdApiKey } from "types";

export const appInfo = {
	name: "{Contract Deployer}",
	title: "{Contract Deployer}",
	subtitle: "Deploy predefined contracts to the blockchain in seconds",
  description: "Deploy contract anytime on mobile or desktop using MetaMask, TrustWallet or any compatible wallet",
	author: "Wisdom Abioye",
	authorDomain: "https://abkabioye.me",
  domain: "https://contract.aider.dev",
  currentYear: new Date().getFullYear(),
}

export const verifySoliditySourceCodeUrl: ChainIdApiKey = {
  [ChainId.ethMainet] : {
    url: "https://api.etherscan.io/api",
    apiKey: "I42KEZ8FGA6QJ7KUREQM672FIP29FAN1UY"
  },
  [ChainId.ethRopsten]: {
    url: "https://api-ropsten.etherscan.io/api",
    apiKey: "I42KEZ8FGA6QJ7KUREQM672FIP29FAN1UY"
  },
  [ChainId.ethRinkeby]: {
    url: "https://api-rinkeby.etherscan.io/api",
    apiKey: "I42KEZ8FGA6QJ7KUREQM672FIP29FAN1UY"
  },
  [ChainId.cronosMainnet]: {
    url: "https://api.cronoscan.com/api",
    apiKey: "A4B3YCP2ST6264TF1FTRUDQU82X7V34DCA"
  },
  [ChainId.bscMainnet]: {
    url: "https://api.bscscan.com/api",
    apiKey: "CRPRSW1ZRJ8YZAXZV3TRIFPV66VPHTPEJQ"
  },
  [ChainId.bscTestnet]: {
    url: "https://api-testnet.bscscan.com/api",
    apiKey: "CRPRSW1ZRJ8YZAXZV3TRIFPV66VPHTPEJQ"
  },
  [ChainId.polygonMainnet]: {
    url: "https://api.polygonscan.com/api",
    apiKey: "XGV58VHI4EZBXGEQZGEN7H4745M4IM6ZGM"
  },
  [ChainId.fantomMainnet]: {
    url: "https://api.ftmscan.com/api",
    apiKey: "6IHZPHU3V529KQ1BR7G9Y9164UIRT8JUY1"
  },
  [ChainId.kccMainnet]: {
    url: "https://api.explorer.kcc.io/vipapi/kcs/contract/submitContractCode?apikey=",
    apiKey: "LR0InUcu2A0jei0UJi6L"
  },
  [ChainId.avaxMainnet]: {
    url: "https://api.snowtrace.io/api",
    apiKey: "CZEFVFFBPE1THMI43MRC4VXEQFQXXXJ6P1"
  }
}

/**
 * @description evmContractsMap
 * This is the list of available evm contracts in the app.
 * We can add new one by adding new entry here and provide the corresponding module/file in contracts/evm
 */
export const evmContractsMap: {name: string, module: string}[]  = [
  {name: "ERC20 Ownable", module: "erc20OwnableContract"},
  {name: "ERC20 Mintable", module: "erc20MintableContract"},
  {name: "ERC1155 NFT Public Minting", module: "erc1155PublicMintOpenseaGaslessListing"},
  

  // TODO: deploy your own contract code
  // using solc-js compiler to generate bytecode and ABI
  // {name: "Custom Contract", module: "customContractCode", contractName: ""}
  {name: "Add a custom contract", module: "contactus"},

]