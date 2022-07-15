import * as  wrapper from 'solc/wrapper';
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

importScripts('https://binaries.soliditylang.org/bin/soljson-v0.8.15+commit.e14f2714.js');

ctx.addEventListener('message', ({data}: any) => {
    const output = compile(data.source, data.include, data.abi);
    ctx.postMessage(output);
})

function cleanUp(output: any, include = '', abi = '0') {
    const newOutput: any = {};

    for (const contract in output) {
        if (include.length && include.indexOf(contract) < 0) continue;
        const thisContract = output[contract];
        // remove extranous fields
        newOutput[contract] = {
            abi: abi === '0' ? [] : thisContract.abi,
            evm: {
                bytecode: {
                    object: thisContract.evm.bytecode.object,
                },
            }
        }
    }
    return newOutput;
}

function compile(source: any, include = '', abi = '0') {
    const solc = wrapper((ctx as any).Module);
    const input = {
        language: 'Solidity',
        sources: {
            'contract.sol': {
                content: source
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    if (output.errors) {
        const extract = ({component, errorCode, formattedMessage, message, type, severity}: any) => ({component, errorCode, formattedMessage, message, type, severity});
        const errors = {errors: output.errors.map(extract)};
        return errors;
    }
    return cleanUp(output.contracts['contract.sol'], include, abi);
}
