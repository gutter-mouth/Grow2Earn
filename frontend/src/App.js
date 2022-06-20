import { useEffect, useState } from "react";
// import { etherscan } from "../../nft-collectible/hardhat.config";
import { ethers } from "ethers";
import './App.css';
import { CONTRACT_ADDRESS } from "./constants";
import { FileUpload } from 'react-ipfs-uploader'
import contract from "./contracts/Grow2Earn.json"
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [fileUrl, setFileUrl] = useState('')

  const transformUrl = (url) => {
    let urlArray = url.split("/");
    return "ipfs://"+urlArray[urlArray.length-1];
  };


  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("No wallet.");
      return;
    } else {
      console.log("Wallet exists.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        console.log("Found an account: ", accounts[0]);
        setCurrentAccount(accounts[0])
      }
      else {
        console.log("No account.");
      }
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("No wallet.");
      return;
    } else {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length !== 0) {
        console.log("Connected to: ", accounts[0]);
        setCurrentAccount(accounts[0])
      }
      else {
        console.log("No account.");
      }
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("Start minting");
        console.log(transformUrl(fileUrl))
        let txn = await nftContract.makeAgaveNFT(transformUrl(fileUrl));
        console.log("Minting");
        await txn.wait();
        console.log("Minted");
      } else {
        console.log("No ethereum object.");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };


  const uploadImageButton = () => {
    return (
      <div>
        <FileUpload setUrl={setFileUrl} />
        FileUrl : <a
          href={fileUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          {fileUrl}
        </a>
      </div>
    );
  }

  const mintNftButton = () => {
    return (
      <div>
        <p>
          Image was uploaded to {transformUrl(fileUrl)}
        </p>
        <button onClick={mintNftHandler} className="cta-button mint-nft-button">
          Mint NFT
        </button>
      </div>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Agave NFT</h1>
      {!currentAccount && (
        <div>{connectWalletButton()}</div>
      )}
      {currentAccount && fileUrl == "" && (
        <div>{uploadImageButton()}</div>
      )}
      {currentAccount && fileUrl != "" && (
        <div>{mintNftButton()}</div>
      )}
    </div>
  );
}

export default App;