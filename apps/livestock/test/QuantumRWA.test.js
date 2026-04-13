import { expect } from "chai";
import pkg from "hardhat";
const { ethers, upgrades } = pkg;

describe("Quantum RWA Platform Security", function () {
  let animalRegistry, agroCredit, petroYield;
  let admin, farmer, vet, unauthorized;

  beforeEach(async function () {
    [admin, farmer, vet, unauthorized] = await ethers.getSigners();

    // Deploy AnimalRegistry
    const AnimalRegistry = await ethers.getContractFactory("AnimalRegistry");
    animalRegistry = await upgrades.deployProxy(AnimalRegistry, [admin.address], { kind: "uups" });
    await animalRegistry.waitForDeployment();

    // Deploy AgroCredit
    const AgroCredit = await ethers.getContractFactory("AgroCredit");
    agroCredit = await upgrades.deployProxy(AgroCredit, [admin.address], { kind: "uups" });
    await agroCredit.waitForDeployment();

    // Deploy PetroYield
    const PetroYield = await ethers.getContractFactory("PetroYieldDistribution");
    petroYield = await upgrades.deployProxy(PetroYield, [admin.address], { kind: "uups" });
    await petroYield.waitForDeployment();

    // Grant roles
    await animalRegistry.grantFarmerRole(farmer.address);
    await animalRegistry.grantVetRole(vet.address);
  });

  describe("AnimalRegistry security", function () {
    it("Should allow farmer to register animal", async function () {
      const animalId = "COW-001";
      const recordHash = ethers.zeroPadValue("0x01", 32);
      const ipfsCID = "QmTest";

      await expect(animalRegistry.connect(farmer).registerAnimal(animalId, recordHash, ipfsCID))
        .to.emit(animalRegistry, "AnimalRegistered");
    });

    it("Should prevent unauthorized user from registering animal", async function () {
      const animalId = "COW-002";
      await expect(animalRegistry.connect(unauthorized).registerAnimal(animalId, ethers.ZeroHash, ""))
        .to.be.reverted;
    });

    it("Should allow vet to log health event", async function () {
      const animalId = "COW-001";
      await animalRegistry.connect(farmer).registerAnimal(animalId, ethers.ZeroHash, "");
      
      await expect(animalRegistry.connect(vet).logHealthEvent(animalId, ethers.ZeroHash, ""))
        .to.emit(animalRegistry, "HealthEventLogged");
    });
  });

  describe("AgroCredit security", function () {
    it("Should allow issuer to issue credit", async function () {
      const tokenId = "CRED-001";
      await expect(agroCredit.issueCredit(tokenId, 1000, 5, 2000000000, ethers.ZeroHash))
        .to.emit(agroCredit, "CreditIssued");
    });

    it("Should prevent non-issuer from issuing credit", async function () {
      await expect(agroCredit.connect(farmer).issueCredit("T", 1, 1, 1, ethers.ZeroHash))
        .to.be.reverted;
    });
  });

  describe("PetroYieldDistribution security", function () {
    it("Should protect upgrades with DEFAULT_ADMIN_ROLE", async function () {
      const NewImpl = await ethers.getContractFactory("PetroYieldDistribution");
      await expect(upgrades.upgradeProxy(await petroYield.getAddress(), NewImpl.connect(unauthorized)))
        .to.be.reverted;
    });
  });
});
