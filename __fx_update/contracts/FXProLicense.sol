// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FX Pro License NFT
 * @dev ERC721 token for FX library pro features
 */
contract FXProLicense is ERC721, Ownable {
    mapping(address => bool) public proAccess;
    uint256 public nextTokenId = 1;
    uint256 public constant PRICE = 0.1 ether;
    
    constructor() ERC721("FX Pro License", "FXPRO") Ownable(msg.sender) {}
    
    function mintPro() external payable {
        require(msg.value >= PRICE, "Insufficient payment");
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        proAccess[msg.sender] = true;
    }
    
    function hasProAccess(address user) external view returns (bool) {
        return proAccess[user] || balanceOf(user) > 0;
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}