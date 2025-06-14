import { expect } from "chai";
import { ethers } from "hardhat";
import { SignaturesSubmitter } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SignaturesSubmitter", function () {
  let signaturesSubmitter: SignaturesSubmitter;
  let owner: SignerWithAddress;
  let relayer: SignerWithAddress;
  let merchant: SignerWithAddress;
  let user: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  beforeEach(async function () {
    [owner, relayer, merchant, user, otherAccount] = await ethers.getSigners();

    const SignaturesSubmitter = await ethers.getContractFactory(
      "SignaturesSubmitter",
    );
    signaturesSubmitter = await SignaturesSubmitter.deploy(relayer.address);
  });

  describe("Deployment", function () {
    it("Should set the right relayer address", async function () {
      expect(await signaturesSubmitter.relayer()).to.equal(relayer.address);
    });
  });

  describe("Signature Submission", function () {
    const storeId = ethers.keccak256(ethers.toUtf8Bytes("store1"));
    const signature = "0x1234567890abcdef";

    it("Should allow submitting a signature", async function () {
      await expect(
        signaturesSubmitter.submitSignature(
          merchant.address,
          user.address,
          storeId,
          signature,
        ),
      )
        .to.emit(signaturesSubmitter, "SignatureSubmitted")
        .withArgs(merchant.address, user.address, storeId, signature);

      const submittedSignature = await signaturesSubmitter.signatures(0);
      expect(submittedSignature.merchant).to.equal(merchant.address);
      expect(submittedSignature.user).to.equal(user.address);
      expect(submittedSignature.storeId).to.equal(storeId);
      expect(submittedSignature.signature).to.equal(signature);
    });

    it("Should store multiple signatures correctly", async function () {
      const storeId2 = ethers.keccak256(ethers.toUtf8Bytes("store2"));
      const signature2 = "0xfedcba0987654321";

      await signaturesSubmitter.submitSignature(
        merchant.address,
        user.address,
        storeId,
        signature,
      );

      await signaturesSubmitter.submitSignature(
        merchant.address,
        user.address,
        storeId2,
        signature2,
      );

      const firstSignature = await signaturesSubmitter.signatures(0);
      const secondSignature = await signaturesSubmitter.signatures(1);

      expect(firstSignature.storeId).to.equal(storeId);
      expect(secondSignature.storeId).to.equal(storeId2);
    });

    it("Should allow anyone to submit a signature", async function () {
      await expect(
        signaturesSubmitter
          .connect(otherAccount)
          .submitSignature(merchant.address, user.address, storeId, signature),
      )
        .to.emit(signaturesSubmitter, "SignatureSubmitted")
        .withArgs(merchant.address, user.address, storeId, signature);
    });
  });
});
