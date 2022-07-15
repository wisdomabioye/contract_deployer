import { UnsupportedChainIdError } from "@web3-react/core"
import { InjectedConnector, NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector, UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { ChainId, ChainNameAndRpc, ChainExplorer, ChainIdColor } from "types";


export const chainIdName: ChainNameAndRpc = {
  [ChainId.ethMainet]: "Ethereum Mainnet",
  [ChainId.ethRopsten]: "Ropsten Test Network",
  [ChainId.ethRinkeby]: "Rinkeby Test Network",
  [ChainId.cronosMainnet]: "Cronos Mainnet",
  [ChainId.bscMainnet]: "BSC Mainnet",
  [ChainId.bscTestnet]: "BSC Testnet",
  [ChainId.polygonMainnet]: "Polygon Mainnet",
  [ChainId.fantomMainnet]: "FTM Mainnet",
  [ChainId.kccMainnet]: "KCC Mainnet",
  [ChainId.avaxMainnet]: "Avax Mainnet",
  [ChainId.harmonyMainnet]: "Harmony Mainnet",
}

export const RPC_URLS: ChainNameAndRpc = {
  [ChainId.ethMainet]: "https://eth-mainnet.alchemyapi.io/v2/",
  [ChainId.ethRopsten]: "https://eth-ropsten.alchemyapi.io/v2/",
  [ChainId.ethRinkeby]: "https://eth-rinkeby.alchemyapi.io/v2/",
  [ChainId.cronosMainnet]: "https://evm.cronos.org",
  [ChainId.bscMainnet]: "https://bsc-dataseed.binance.org/",
  [ChainId.bscTestnet]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  [ChainId.polygonMainnet]: "https://rpc-mainnet.matic.quiknode.pro/",
  [ChainId.fantomMainnet]: "https://rpc.ftm.tools/",
  [ChainId.kccMainnet]: "https://rpc-mainnet.kcc.network",
  [ChainId.avaxMainnet]: "https://api.avax.network/ext/bc/C/rpc",
  [ChainId.harmonyMainnet]: "https://api.harmony.one",
}

export const networkExplorer: ChainExplorer = {
  [ChainId.ethMainet]: {
    address: "https://etherscan.io/address/",
    tx: "https://etherscan.io/tx/",
    block: "https://etherscan.io/block/"
  },
  [ChainId.ethRopsten]: {
    address: "https://ropsten.etherscan.io/address/",
    tx: "https://ropsten.etherscan.io/tx/",
    block: "https://ropsten.etherscan.io/block/",
  },
  [ChainId.ethRinkeby]: {
    address: "https://rinkeby.etherscan.io/address/",
    tx: "https://rinkeby.etherscan.io/tx/",
    block: "https://rinkeby.etherscan.io/block/",
  },
  [ChainId.cronosMainnet]: {
    address: "https://cronoscan.com/address/",
    tx: "https://cronoscan.com/tx/",
    block: "https://cronoscan.com/block/",
  },
  [ChainId.bscMainnet]: {
    address: "https://bscscan.com/address/",
    tx: "https://bscscan.com/tx/",
    block: "https://bscscan.com/block/",
  },
  [ChainId.bscTestnet]: {
    address: "https://testnet.bscscan.com/address/",
    tx: "https://testnet.bscscan.com/tx/",
    block: "https://testnet.bscscan.com/block/",
  },
  [ChainId.polygonMainnet]: {
    address: "https://polygonscan.com/address/",
    tx: "https://polygonscan.com/tx/",
    block: "https://polygonscan.com/block/",
  },
  [ChainId.fantomMainnet]: {
    address: "https://ftmscan.com/address/",
    tx: "https://ftmscan.com/tx/",
    block: "https://ftmscan.com/block/",
  },
  [ChainId.kccMainnet]: {
    address: "https://explorer.kcc.io/address/",
    tx: "https://explorer.kcc.io/tx/",
    block: "https://explorer.kcc.io/block/",
  },
  [ChainId.avaxMainnet]: {
    address: "https://snowtrace.io/address/",
    tx: "https://snowtrace.io/tx/",
    block: "https://snowtrace.io/block/",
  },
  [ChainId.harmonyMainnet]: {
    address: "https://explorer.harmony.one/address/",
    tx: "https://explorer.harmony.one/tx/",
    block: "https://explorer.harmony.one/block/",
  }
}

export const chainIdColor: ChainIdColor = {
  [ChainId.ethMainet]: {
    text: "text-light",
    bg: "bg-success"
  },
  [ChainId.bscMainnet]: {
    text: "text-dark",
    bg: "bg-warning"
  },
  [ChainId.kccMainnet]: {
    text: "text-light",
    bg: "bg-info"
  },
  [ChainId.avaxMainnet]: {
    text: "text-light",
    bg: "bg-danger"
  }
}

/* CONNECTORS */

export const injected = new InjectedConnector({ supportedChainIds: Object.keys(RPC_URLS).map(key => parseInt(key)) })

export const network = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: 1
})

export const walletconnect = new WalletConnectConnector({
  rpc: { ...RPC_URLS },
  qrcode: true
})

/* ERROR GETTER */
export const getErrorMessage = (error: any) => {
  if (error instanceof NoEthereumProviderError) {
  
    return "No injected provider detected";

  } else if (error instanceof UnsupportedChainIdError) {
  
    return "You are connected to an unsupported network";
  
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "User denied account access";
  
  } else {
      
    return "An unknown error occurred";
  }
}

export const getAddressExplorerLink = (account: string, chainId: ChainId) => {
    const explorer = networkExplorer[chainId];

    if (explorer) {
      return `${explorer.address}${account}`;
    }

    return `#`;
}

export const getTransactionExplorerLink = (txHash: string, chainId: ChainId) => {
    const explorer = networkExplorer[chainId];

    if (explorer) {
      return `${explorer.tx}${txHash}`;
    }

    return `#`;
}

export const getBlockExplorerLink = (block: string, chainId: ChainId) => {
    const explorer = networkExplorer[chainId];

    if (explorer) {
      return `${explorer.block}${block}`;
    }

    return `#`;
}