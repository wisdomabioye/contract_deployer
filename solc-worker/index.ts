const wrapper = require('solc/wrapper');
// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

// eslint-disable-next-line no-undef
importScripts('https://binaries.soliditylang.org/bin/soljson-v0.8.15+commit.e14f2714.js');

ctx.addEventListener('message', ({data}: any) => {
    const { source, options }: {source: string, options: any} = data;
    const output = compile(source, options);
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

function compile(source: any, options = {}) {
    const { include = "", abi = "0", optimize = true, runs = 200, evmVersion = "byzantium" }: any = options;
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
                'contract.sol': {
                    '*': [ 'abi', 'evm.bytecode.object' ]
                }
            },
            optimizer: {
                enabled: optimize,
                runs
            },
            evmVersion,
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
