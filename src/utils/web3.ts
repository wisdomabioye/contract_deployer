import Web3 from "web3"
import { RPC_URLS } from "web3Network/connector";

const httpProvider = new Web3.providers.HttpProvider(RPC_URLS[1], { timeout: 10000 });
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
