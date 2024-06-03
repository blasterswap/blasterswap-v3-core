import fs from 'fs-extra';
import hre from 'hardhat';
import { join } from 'path';
import { libraries } from '../typechain-types';

async function verify(params: object) {
	await hre.run('verify:verify', params);
}

async function main(): Promise<void> {
	const network = hre.network.name;

	const deploymentPath = join(__dirname, `../deployments/${network}`);

	const factory = await fs.readJson(join(deploymentPath, 'BlasterswapV3Factory.json'));
	const Oracle = await fs.readJson(join(deploymentPath, 'Oracle.json'));
	const Tick = await fs.readJson(join(deploymentPath, 'TickMath.json'));

	console.log('Verifying factory');
	await verify({
		address: factory.address,
		constructorArguments: factory.args,
		libraries: {
			Oracle: Oracle.address,
			TickMath: Tick.address,
		},
	});

	console.log('Verifying Oracle');
	await verify({
		address: Oracle.address,
	});

	console.log('Verifying TickMath');
	await verify({
		address: Oracle.address,
	});
}

main()
	.then(() => process.exit(0))
	.catch((error: Error) => {
		console.error(error);
		process.exit(1);
	});
