const hre = require("hardhat");

async function main() {
  const ConfessionBoard = await hre.ethers.getContractFactory("ConfessionBoard");

  console.log("Deploying ConfessionBoard...");

  const confessionBoard = await ConfessionBoard.deploy();

  // Wait until mined
  await confessionBoard.deployed();

  console.log("ConfessionBoard deployed to:", confessionBoard.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
