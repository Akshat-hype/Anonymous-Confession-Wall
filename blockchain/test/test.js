const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConfessionBoard Contract", function () {

  let ConfessionBoard;
  let confessionBoard;
  let owner;
  let user;

  beforeEach(async function () {
    // Get signers
    [owner, user] = await ethers.getSigners();

    // Deploy fresh contract for testing
    ConfessionBoard = await ethers.getContractFactory("ConfessionBoard");
    confessionBoard = await ConfessionBoard.deploy();
    await confessionBoard.deployed();
  });

  it("Should start with 0 confessions", async function () {
    const count = await confessionBoard.getTotalConfessions();
    expect(count).to.equal(0);
  });

  it("Should allow user to post confession", async function () {
    await confessionBoard.connect(user).postConfession("Hello Blockchain");

    const count = await confessionBoard.getTotalConfessions();
    expect(count).to.equal(1);
  });

  it("Should store confession correctly", async function () {
    await confessionBoard.connect(user).postConfession("Test Confession");

    const confession = await confessionBoard.getConfession(1);

    expect(confession.id).to.equal(1);
    expect(confession.author).to.equal(user.address);
    expect(confession.text).to.equal("Test Confession");
  });

  it("Should revert on empty confession", async function () {
    await expect(
      confessionBoard.connect(user).postConfession("")
    ).to.be.revertedWith("Empty confession");
  });

});
