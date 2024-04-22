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

const blastURI = process.env.BLAST_URI || '';
const ethSepoliaURI = process.env.ETH_SEPOLIA_URI || '';
const mnemonic = process.env.MNEMONIC || '';
const localURI = 'http://localhost:8545';

const blastScanAPIKey = process.env.ETHERSCAN_API_KEY_BLAST || '';
const ethSepoliaScanAPIKey = process.env.ETHERSCAN_API_KEY_ETH_SEPOLIA || '';

export default {
  networks: {
    local: {
      url: localURI,
    },
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    blast: {
      url: blastURI,
      accounts: {
        mnemonic: mnemonic,
      },
    },
    ethSepolia: {
      url: ethSepoliaURI,
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
        chainId: 238,
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
          runs: 400,
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
