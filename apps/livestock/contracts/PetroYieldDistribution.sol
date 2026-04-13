// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title PetroYieldDistribution
 * @dev Secure revenue distribution contract for energy sector yields.
 * Implements the Pull Pattern to prevent reentrancy and gas limit issues.
 */
contract PetroYieldDistribution is 
    Initializable, 
    AccessControlUpgradeable, 
    PausableUpgradeable, 
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable 
{
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    uint256 public totalYieldDistributed;
    mapping(address => uint256) public pendingWithdrawals;

    event YieldRecorded(uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed holder, uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ORACLE_ROLE, admin);
    }

    /**
     * @dev Records new yield for distribution. In a real scenario, this would
     * increment pending balances based on a snapshot of token holders.
     */
    function recordYield(uint256 amount) external onlyRole(ORACLE_ROLE) whenNotPaused {
        totalYieldDistributed += amount;
        emit YieldRecorded(amount, block.timestamp);
    }

    /**
     * @dev Allows users to pull their pending yield.
     * Implementation of the secure withdrawal pattern.
     */
    function withdraw() external nonReentrant whenNotPaused {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No yield to withdraw");

        pendingWithdrawals[msg.sender] = 0;
        
        // Use call instead of transfer for safety
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawal(msg.sender, amount);
    }

    /**
     * @dev Emergency pause.
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {}

    // Fallback to receive funds
    receive() external payable {}
}
