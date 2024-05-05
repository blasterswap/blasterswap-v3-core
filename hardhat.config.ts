import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-verify';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'; //for hardhat-deploy-ethers
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import { Wallet } from 'ethers';


dotenvConfig({ path: resolve(__dirname, './.env') });

const BLAST_RPC_URI = process.env.BLAST_RPC_URI || '';
const SEPOLIA_RPC_URI = process.env.SEPOLIA_RPC_URI || '';
const BLAST_PRIVATE_KEY = process.env.BLAST_PRIVATE_KEY || '';
const LOCAL_URI = 'http://localhost:8545';

const BLASTSCAN_API_KEY = process.env.BLASTSCAN_API_KEY || '';
const SEPOLIASCAN_API_KEY = process.env.ETHERSCAN_API_KEY_ETH_SEPOLIA || '';

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    blast: {
      url: BLAST_RPC_URI,
      chainId: 81457,
      accounts: [
        Wallet.fromPhrase(BLAST_PRIVATE_KEY).privateKey
      ]
    },
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {
    apiKey: {
      blast: BLASTSCAN_API_KEY,
    },
    customChains: [
      {
        network: "blast",
        chainId: 81457,
        urls: {
          apiURL: "https://api.blastscan.io/api",
          browserURL: "https://blastscan.io"
        }
      }
    ]
  },
  solidity: {
    compilers: [{
      version: '0.7.6',
      settings: {
        optimizer: {
          enabled: true,
          runs: 100,
        },
        metadata: {
          // do not include the metadata hash, since this is machine dependent
          // and we want all generated code to be deterministic
          // https://docs.soliditylang.org/en/v0.7.6/metadata.html
          bytecodeHash: 'none',
        },
      },
    },
    ],
  },
}
