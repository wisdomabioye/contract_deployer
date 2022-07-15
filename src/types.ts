export enum ChainId {
    ethMainet = 1,
    ethRopsten = 3,
    ethRinkeby = 4,
    cronosMainnet = 25,
    bscMainnet = 56,
    bscTestnet = 97,
    polygonMainnet = 137,
    fantomMainnet = 250,
    kccMainnet = 321,
    avaxMainnet = 43114,
    harmonyMainnet = 1666600000
}

export type ChainNameAndRpc = {
    [chainId in ChainId | number]: string
}
  
export type ChainExplorer = {
    [chainId in ChainId | number]: {address: string, tx: string, block: string}
}

export type ChainIdColor = {
    [chainId in ChainId | number]?: {bg: string,text: string}
}

export type ChainIdApiKey = {
    [chainId in ChainId | number]: {url: string, apiKey: string}
}

export type DeployData = {
    deployed: boolean;
    contractAddress: string;
    transactionHash: string;
    chainId: number;
    selectedContract: string;
    constructorArgs: string;
    contractCode: string;
    contractName: string;
    optimizationUsed: boolean;
    optimizationRuns?: number;
}