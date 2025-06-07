// NFT-based pro licensing - Your blockchain expertise
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract FXLicense is ERC721 {
    mapping(address => bool) public proAccess;
    constructor() ERC721("FX Pro License", "FXPRO") {}
    function mintPro(address to, uint256 tokenId) external {
        _mint(to, tokenId);
        proAccess[to] = true;
    }
    function hasProAccess(address user) external view returns (bool) {
        return proAccess[user] || balanceOf(user) > 0;
    }
}