import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { pool } from '../typechain-types/interfaces';

const ONE_BP_FEE = 100;
const ONE_BP_TICK_SPACING = 1;

const gasRefundAddress = "0xba99b8a284f45447929a143dc2efa5bcfe7ade60";
const wethAddress = "0x4300000000000000000000000000000000000004";
const usdbAddress = "0x4300000000000000000000000000000000000003";

const blastNetworkName = 'blast';

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
		args: [gasRefundAddress],
		log: true,
		libraries: {
			Oracle: oracleLibrary.address,
			TickMath: tickMathLibrary.address
		}
	});
	console.log("Deploying factory => Done")

	const v3Factory = await ethers.getContractAt("BlasterswapV3Factory", v3CoreFactory.address);

	console.log("Enabling fees and tick spacing...")
	let tx = await v3Factory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING);
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

	console.log("creating weth/usdb pool...");
	tx = await v3Factory.createPool(
		usdbAddress,
		wethAddress,
		3000
	);

	await tx.wait();

	const poolCreatedFilter = v3Factory.filters.PoolCreated;
	const poolCreatedEvent = await v3Factory.queryFilter(poolCreatedFilter);

	const poolAddress = poolCreatedEvent[0].args.pool;

	console.log(`Pool address: ${poolAddress}`);

	const deployedPoolBytecode = await hre.ethers.provider.getCode(poolAddress);
	const hash = ethers.solidityPackedKeccak256(
		["bytes"], [deployedPoolBytecode]
	)

	console.log(`Pool's init code hash: ${hash}`);




};

module.exports.tags = ['Factory'];
