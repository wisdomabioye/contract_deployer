import web3NoAccount from "utils/web3";

export const getContract = (abi: any, address: string, web3: any, options = {}) => {
  const _web3 = web3 || web3NoAccount
  return new _web3.eth.Contract(abi, address, options);
}

