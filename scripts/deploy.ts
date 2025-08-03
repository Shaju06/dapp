import { ethers } from "hardhat";

async function main() {
  const Bank = await ethers.getContractFactory("SimpleBank");
  const bank = await Bank.deploy();
  await bank.waitForDeployment();

  console.log(`SimpleBank deployed to: ${await bank.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
