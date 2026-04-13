// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title AnimalRegistry
 * @dev Secure, upgradeable hybrid on-chain/off-chain registry for livestock provenance and health tracking.
 * This contract anchors the hash + IPFS CID representation of the full off-chain database 
 * footprint to a permanent, immutable ledger layer.
 */
contract AnimalRegistry is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant VETERINARIAN_ROLE = keccak256("VETERINARIAN_ROLE");
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");

    event AnimalRegistered(
        string indexed animalId,
        bytes32 recordHash,
        string ipfsCID,
        uint256 timestamp,
        address farmer
    );

    event HealthEventLogged(
        string indexed animalId,
        bytes32 eventHash,
        string ipfsCID,
        uint256 timestamp,
        address vet
    );

    // Track existing active animals
    mapping(string => bool) public activeAnimals;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /**
     * @dev Registers a new animal. Restricted to FARMER_ROLE or ADMIN.
     */
    function registerAnimal(
        string memory animalId,
        bytes32 recordHash,
        string memory ipfsCID
    ) external onlyRole(FARMER_ROLE) {
        require(!activeAnimals[animalId], "Animal ID already registered");
        activeAnimals[animalId] = true;
        
        emit AnimalRegistered(animalId, recordHash, ipfsCID, block.timestamp, msg.sender);
    }

    /**
     * @dev Logs a health event. Restricted to VETERINARIAN_ROLE or ADMIN.
     */
    function logHealthEvent(
        string memory animalId,
        bytes32 eventHash,
        string memory ipfsCID
    ) external onlyRole(VETERINARIAN_ROLE) {
        require(activeAnimals[animalId], "Animal ID not found");
        
        emit HealthEventLogged(animalId, eventHash, ipfsCID, block.timestamp, msg.sender);
    }

    /**
     * @dev Authorizes a contract upgrade. Restricted to DEFAULT_ADMIN_ROLE.
     */
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {}

    /**
     * @dev Helper to grant multiple roles (e.g. for testing or complex setups).
     */
    function grantVetRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(VETERINARIAN_ROLE, account);
    }

    function grantFarmerRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(FARMER_ROLE, account);
    }
}
