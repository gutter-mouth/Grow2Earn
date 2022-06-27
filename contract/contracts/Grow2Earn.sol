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
    address[]  minter;
    bool[] isValid;
    struct Record {
        string imageURI;
        string animationURI;
        uint256 timestamp;
    }
    mapping(uint256 => Record[]) record;

    event NewAgaveNFTMinted(address sender, uint256 tokenId);
    event TokenURIUpdated(address sender, uint256 tokenId);
    event TokenURISwitched(address sender, uint256 tokenId, uint256 index);
    event TokenURIRedeemed(address sender, uint256 tokenId);


    constructor() ERC721 ("RYUZETSU NFT ALPHA", "RYUZETSU ALPHA") {
        console.log("This is my NFT contract.");
    }

    // generate tokenURI string from tokenId and imageURI
    function makeTokenURI(uint256 tokenId, string memory imageURI, string memory animationURI) private pure returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "RYUZETSU #', 
                        Strings.toString(tokenId),
                        '","description": "RYUZETSU NFT", "image": "', 
                        imageURI, 
                        '", "animation_url": "', 
                        animationURI, 
                        '"}'  
                    )
                )
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function makeAgaveNFT(string memory imageURI, string memory animationURI) public { // mint a new NFT having metadata with imageURI (image path) and animationURI (3D model path)
        uint256 newtokenId = _tokenIds.current();
        string memory newTokenURI = makeTokenURI(newtokenId, imageURI, animationURI);
        _safeMint(msg.sender, newtokenId);
        _setTokenURI(newtokenId, newTokenURI);
        record[newtokenId].push(Record(imageURI, animationURI, block.timestamp));
        minter.push(msg.sender);
        isValid.push(true);
        console.log("An NFT w/ ID %s has been minted to %s", newtokenId, msg.sender);
        _tokenIds.increment();
        emit NewAgaveNFTMinted(msg.sender, newtokenId);
    }

    function updateTokenURI(uint256 tokenId, string memory imageURI, string memory animationURI) public { // update metadata and add record
        require(tokenId <= _tokenIds.current()-1, "Over existing tokenId");
        require(msg.sender == minter[tokenId], "Only minter can update metadata");
        require(isValid[tokenId], "Token is invalid");
        _setTokenURI(tokenId, makeTokenURI(tokenId, imageURI, animationURI));
        record[tokenId].push(Record(imageURI, animationURI, block.timestamp));
        emit TokenURIUpdated(msg.sender, tokenId);
    }

    function switchTokenURI(uint256 tokenId, uint index) public { // select metadata from existing record
        require(tokenId <= _tokenIds.current()-1, "Over existing tokenId");
        require(index <= record[tokenId].length-1, "Over existing record length");
        require(msg.sender == ownerOf(tokenId), "Only holder can switch metadata");
        require(isValid[tokenId], "Token is invalid");
        _setTokenURI(tokenId, makeTokenURI(tokenId, record[tokenId][index].imageURI, record[tokenId][index].animationURI));
        emit TokenURISwitched(msg.sender, tokenId, index);
    }

    function redeem(uint256 tokenId) public { // redeem NFT (make NFT invalid)
        require(tokenId <= _tokenIds.current()-1, "Over existing tokenId");
        require(msg.sender == ownerOf(tokenId), "Only owner can redeem");
        require(isValid[tokenId], "Token is invalid");
        isValid[tokenId] = false;
        emit TokenURIRedeemed(msg.sender, tokenId);
    }

    function getIsValid(uint256 tokenId)public view returns(bool){
        return isValid[tokenId];
    }

    function getCounter() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getRecord(uint256 tokenId) public view returns (Record[] memory){
        return record[tokenId];
    }
}