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


dotenvConfig({ path: resolve(__dirname, './.env') });

const blastURL = process.env.BLAST_RPC_URL || '';
const ethSepoliaURL = process.env.SEPOLIA_RPC_URL || '';
const localURL = 'http://localhost:8545';

const mnemonic = process.env.BLAST_PRIVATE_KEY || '';

const blastScanAPIKey = process.env.BLASTSCAN_API_KEY || '';
const ethSepoliaScanAPIKey = process.env.ETHERSCAN_API_KEY_ETH_SEPOLIA || '';

export default {
  networks: {
    local: {
      url: localURL,
    },
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    blast: {
      url: blastURL,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    ethSepolia: {
      url: ethSepoliaURL,
      accounts: {
        mnemonic: mnemonic,
      },
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ethSepoliaScanAPIKey,
      blast: blastScanAPIKey,
    },
    customChains: [
      {
        network: "blast",
        chainId: 81457,
        urls: {
          apiURL: "https://api.blastscan.io/api",
          browserURL: "https://api.blastscan.io/api"
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
