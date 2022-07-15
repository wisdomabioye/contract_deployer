### Contract Deployer


Deploy and verify predefined contracts to the blockchain in seconds.
Deploy contract anytime on mobile or desktop using MetaMask, TrustWallet or any compatible wallet

- Deploy ERC20, ERC1155 or add a new contract
- Deploy using Trustwallet, Metamask or any web3 compatible wallet
- Verify source code on popular block explorer in seconds

##### Add a new contract


Adding a new contract involves 5 steps
1. Clone this repo
2. Copy the file `contracts/evm/sample.ts`, rename it and replace the content with your contract data
3. Import your new file to `contracts/evm/index.ts` as a unique module name and add the name to the list of default export module
4. Add the new unique module name added in `step 3` to `evmContractsMap` array as `{name: 'Display name', module: 'uniqueModuleName'}`  in `app.config.ts`
5. And finally, send a pull request


##### Solidity version

Current version in use is `v0.8.15+commit.e14f2714` - contract code must compile using this commit


Licence: MIT

