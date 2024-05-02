import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Wallet } from 'ethers';

const ONE_BP_FEE = 100
const ONE_BP_TICK_SPACING = 1

const blastNetworkName = 'blast';

const admin = "0x2AcF0a024a4Fd16E3A0CDDdB32FC229759290a1e"

module.exports = async (hre: HardhatRuntimeEnvironment) => {
	const { deploy } = hre.deployments;
	const { deployer } = await hre.getNamedAccounts();
	const { ethers } = hre;

	const tickMathLibrary = await deploy("TickMath", {
		from: deployer,
		log: true
	});

	const oracleLibrary = await deploy("Oracle", {
		from: deployer,
		log: true
	});

	console.log("Deploying factory...")
	const v3CoreFactory = await deploy('BlasterswapV3Factory', {
		from: deployer,
		args: [admin],
		log: true,
		libraries: {
			Oracle: oracleLibrary.address,
			TickMath: tickMathLibrary.address
		}
	});
	console.log("Deploying factory => Done")

	const v3Factory = await ethers.getContractAt("BlasterswapV3Factory", v3CoreFactory.address);

	console.log("Enabling fees and tick spacing...")
	const tx = await v3Factory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING);
	await tx.wait();
	console.log("Enabling fees and tick spacing => Done")

	if (hre.network.name != blastNetworkName) {
		await deploy('WETH', {
			from: deployer,
			log: true,
		});

		await deploy('ERC20Mock', {
			from: deployer,
			args: ["mock", "ERC20Mock"],
			log: true,
		});
	}
};

module.exports.tags = ['Factory'];
