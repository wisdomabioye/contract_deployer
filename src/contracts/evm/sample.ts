// describe the contract and features in a sentence or two.
export const description = "Provide your contract description here.";

/**
 * @description ContractProps (optional)
 * Define the interface for the contract constructor parameters
*/
export interface ContractProps  {
    name: string;
    ticker: string;
    supply: number;
    decimals: number;
}

/**
 * @description contractFields (optional)
 * Define the input fields for the contract constructor as defined in the contract `ContractProps`
 * Each field will be collected from the front end and passed to the constructor on deployment
* The order of the fields in the array is the order in which they will be passed to the contract constructor 
*/
export const contractFields = [
    {name: "name", type: "text", label: "Token name e.g Cookie Project", placeholder: "Enter token name", solType: "string"}, // the name 'name' will be used as the main contract name in the 'contractCode' below
    {name: "ticker", type: "text", label: "Token symbol e.g CKP", placeholder: "Enter token symbol", solType: "string"},
    {name: "decimals", type: "text", label: "Token decimals e.g 18", placeholder: "Enter token decimals", solType: "uint256"},
    {name: "supply", type: "text", label: "Initial supply e.g 1000000", placeholder: "Enter initial supply", solType: "uint256"},
 ];

/**
 * @description contractCode
 * @param {string} contractName is the name of the main contract that'll be deployed to the blockchain
 * The contractName will be passed to the contractCode function.
 * The contractName will be generated from the `name` field user input.
 */
 export function contractCode (contractName: string) {
    // contract must compile to a single file
    return (
    `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.15;

    contract ${contractName} {
        string public name;
        string public symbol;
        uint256 public decimals;
        uint256 public totalSupply;

        constructor(string memory _name, string memory _symbol, uint256 _decimals, uint256 _totalSupply) public {
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            totalSupply = _totalSupply;
        }
    }
    `)
 }
