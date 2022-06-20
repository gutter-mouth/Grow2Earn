// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";

contract Grow2Earn is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 maxId = 99;
    address[]  minter;
    bool[] isValid;
    struct Record {
        string imageURI;
        uint256 timestamp;
    }
    mapping(uint256 => Record[]) record;

    event NewAgaveNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721 ("SqureNFT", "SQUARE") {
        console.log("This is my NFT contract.");
    }

    // generate tokenURI string from tokenId and imageURI
    function makeTokenURI(uint256 tokenId, string memory imageURI) private pure returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "AgaveNFT #', 
                        Strings.toString(tokenId),
                        '","description": "Agave NFT", "image": "', 
                        imageURI, 
                        '"}'  
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function makeAgaveNFT(string memory imageURI) public {
        uint256 newTokenId = _tokenIds.current();
        require(newTokenId <= maxId, "Over maxId");

        string memory newTokenURI = makeTokenURI(newTokenId, imageURI);
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, newTokenURI);
        record[newTokenId].push(Record(imageURI, block.timestamp));
        minter.push(msg.sender);
        isValid.push(true);
        console.log("An NFT w/ ID %s has been minted to %s", newTokenId, msg.sender);
        _tokenIds.increment();
        emit NewAgaveNFTMinted(msg.sender, newTokenId);
    }

    function updateTokenURI(uint256 tokenId, string memory imageURI) public {
        require(tokenId <= _tokenIds.current()-1, "Over existing tokenId");
        require(msg.sender == minter[tokenId], "Only minter can update metadata");
        require(isValid[tokenId], "Token is invalid");
        _setTokenURI(tokenId, makeTokenURI(tokenId, imageURI));
        record[tokenId].push(Record(imageURI, block.timestamp));
    }

    function redeem(uint256 tokenId) public {
        require(tokenId <= _tokenIds.current()-1, "Over existing tokenId");
        require(ownerOf(tokenId)!=minter[tokenId], "Redeemed token must be owned by address except for minter");
        require(isValid[tokenId], "Token is invalid");

        safeTransferFrom(msg.sender, minter[tokenId], tokenId);
        isValid[tokenId] = false;
    }

    function getIsValid(uint256 tokenId)public view returns(bool){
        return isValid[tokenId];
    }

    function getCounter() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getMaxId() public view returns (uint256) {
        return maxId;
    }

    function getRecord(uint256 tokenId) public view returns (Record[] memory){
        return record[tokenId];
    }
}