// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AnimalRegistry
 * @dev Hybrid on-chain/off-chain registry for livestock provenance and health tracking.
 * This contract anchors the hash + IPFS CID representation of the full off-chain database 
 * footprint to a permanent, immutable ledger layer.
 */
contract AnimalRegistry {
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
        address vetOrFarmer
    );

    // Track existing active animals
    mapping(string => bool) public activeAnimals;

    function registerAnimal(
        string memory animalId,
        bytes32 recordHash,
        string memory ipfsCID
    ) external {
        require(!activeAnimals[animalId], "Animal ID already registered");
        activeAnimals[animalId] = true;
        
        emit AnimalRegistered(animalId, recordHash, ipfsCID, block.timestamp, msg.sender);
    }

    function logHealthEvent(
        string memory animalId,
        bytes32 eventHash,
        string memory ipfsCID
    ) external {
        require(activeAnimals[animalId], "Animal ID not found");
        
        emit HealthEventLogged(animalId, eventHash, ipfsCID, block.timestamp, msg.sender);
    }
}
