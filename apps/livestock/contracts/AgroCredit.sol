// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title AgroCredit
 * @dev Secure, upgradeable contract for managing agricultural credit tokens and harvests.
 */
contract AgroCredit is 
    Initializable, 
    AccessControlUpgradeable, 
    PausableUpgradeable, 
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable 
{
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    struct Credit {
        uint256 amount;
        uint256 interestRate;
        uint256 dueDate;
        bool isRedeemed;
        bytes32 dataHash; // Off-chain metadata reference
    }

    mapping(string => Credit) public credits;
    mapping(string => bool) public activeTokens;

    event CreditIssued(string indexed tokenId, address indexed farmer, uint256 amount, uint256 dueDate);
    event CreditRedeemed(string indexed tokenId, address indexed farmer, uint256 amount);

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
        _grantRole(ISSUER_ROLE, admin);
    }

    /**
     * @dev Issues a new credit token to a farmer.
     */
    function issueCredit(
        string memory tokenId,
        uint256 amount,
        uint256 interestRate,
        uint256 dueDate,
        bytes32 dataHash
    ) external onlyRole(ISSUER_ROLE) whenNotPaused {
        require(!activeTokens[tokenId], "Token ID already exists");
        
        credits[tokenId] = Credit({
            amount: amount,
            interestRate: interestRate,
            dueDate: dueDate,
            isRedeemed: false,
            dataHash: dataHash
        });
        
        activeTokens[tokenId] = true;
        
        emit CreditIssued(tokenId, msg.sender, amount, dueDate);
    }

    /**
     * @dev Redeems a credit token.
     */
    function redeemCredit(string memory tokenId) external nonReentrant whenNotPaused {
        require(activeTokens[tokenId], "Token not found");
        require(!credits[tokenId].isRedeemed, "Already redeemed");
        
        credits[tokenId].isRedeemed = true;
        
        emit CreditRedeemed(tokenId, msg.sender, credits[tokenId].amount);
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
}
