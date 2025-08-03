import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { ethers } from "hardhat";

describe("SimpleBank", function () {
  async function deployBankFixture() {
    const Bank = await ethers.getContractFactory("SimpleBank");
    const bank = await Bank.deploy();
    const [owner, user1] = await ethers.getSigners();
    return { bank, owner, user1 };
  }

  it("should allow deposit", async function () {
    const { bank, owner } = await loadFixture(deployBankFixture);

    const depositAmount = ethers.parseEther("1");

    await expect(
      bank.connect(owner).deposit({ value: depositAmount })
    ).to.changeEtherBalance(bank, depositAmount);

    const balance = await bank.getBalance();
    expect(balance).to.equal(depositAmount);
  });

  it("should allow withdrawal", async function () {
    const { bank, owner } = await loadFixture(deployBankFixture);

    const depositAmount = ethers.parseEther("1");
    const withdrawAmount = ethers.parseEther("0.5");

    await bank.connect(owner).deposit({ value: depositAmount });

    await expect(() =>
      bank.connect(owner).withdraw(withdrawAmount)
    ).to.changeEtherBalances(
      [bank, owner],
      [withdrawAmount * -1n, withdrawAmount]
    );

    const balance = await bank.getBalance();
    expect(balance).to.equal(depositAmount - withdrawAmount);
  });

  it("should reject withdrawals over balance", async function () {
    const { bank, owner } = await loadFixture(deployBankFixture);
    await expect(bank.connect(owner).withdraw(1)).to.be.revertedWith(
      "Insufficient balance"
    );
  });

  it("should reject zero deposits", async function () {
    const { bank, owner } = await loadFixture(deployBankFixture);
    await expect(bank.connect(owner).deposit({ value: 0 })).to.be.revertedWith(
      "Deposit must be greater than 0"
    );
  });
});
