/**
 * Import Evm contracts here,
 * Export all the imported contracts here,
 * Each exported name must be listed in evmContractsMap in app.config.ts
 */
import * as erc20OwnableContract from "./erc20_ownable";
import * as erc20MintableContract from "./erc20_mintable";
import * as erc1155PublicMintOpenseaGaslessListing from "./erc1155_public_mint_opensea_gasless_list";

const contracts: any = {
    erc20OwnableContract, 
    erc20MintableContract,
    erc1155PublicMintOpenseaGaslessListing
};

export default contracts