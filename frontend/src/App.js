import { useEffect, useState } from "react";
import { Buffer } from "buffer";
// import { etherscan } from "../../nft-collectible/hardhat.config";
import { ethers } from "ethers";
import './App.css';
import { CONTRACT_ADDRESS } from "./constants";
import { FileUpload } from 'react-ipfs-uploader'
import contract from "./contracts/Grow2Earn.json"
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [nftContract, setNftContract] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const httpToIpfs = (url) => {
    let urlArray = url.split("/");
    if (urlArray[0] !== "ipfs:") {
      return "ipfs://" + urlArray[urlArray.length - 1];
    } else {
      return url;
    }
  };

  const ipfsToHttp = (url) => {
    let urlArray = url.split("/");
    if (urlArray[0] === "ipfs:") {
      return "https://cloudflare-ipfs.com/ipfs/" + urlArray[urlArray.length - 1];
    } else {
      return url;
    }
  };

  const getMetaData = async (tokenId) => {
    if (nftContract) {
      let rawMeta = await nftContract.tokenURI(tokenId);
      let metaArray = rawMeta.split(",");
      let metaData = JSON.parse(Buffer.from(metaArray[metaArray.length - 1], 'base64').toString());
      return metaData;
    }
  }

  const getOwnedTokenIds = async (account) => {
    if (nftContract && account) {
      try {
        const sentLogs = await nftContract.queryFilter(
          nftContract.filters.Transfer(account, null),
        );

        const receivedLogs = await nftContract.queryFilter(
          nftContract.filters.Transfer(null, account),
        );
        const logs = sentLogs.concat(receivedLogs)
          .sort(
            (a, b) =>
              a.blockNumber - b.blockNumber ||
              a.transactionIndex - b.TransactionIndex,
          );
        const owned = new Set();
        for (const log of logs) {
          const { from, to, tokenId } = log.args;

          if (to.toLowerCase() === account.toLowerCase()) {
            owned.add(tokenId.toString());
          } else if (from.toLowerCase() === account.toLowerCase()) {
            owned.delete(tokenId.toString());
          }
        }
        console.log(nftContract, account, owned);
        return [...owned].map(own => Number(own));
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  const loadImageUrls = async (account) => {
    if (nftContract && account) {
      let tokenIds = await getOwnedTokenIds(account);
      let metaDatas = await Promise.all(tokenIds.map(async (id) => {
        return await getMetaData(id);
      }));
      let urls = [];

      metaDatas.forEach(data => {
        urls.push(ipfsToHttp(data.image));
      });
      setImageUrls(urls);

      // let urls = tokenIds.map(async (id) => {
      //   let metaData = await getMetaData(id);
      //   return metaData;
      // });
      try {
        return;
      }
      catch (error) {
        console.log(error);
      }
    }
  };
  // const getContract = () => {
  //   const { ethereum } = window;
  //   if (ethereum) {
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  //     return contract;
  //   }
  // }

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("No wallet.");
      return;
    } else {
      console.log("Wallet exists.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log("Found an account: ", account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setCurrentAccount(account);
        setNftContract(contract);
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
        const account = accounts[0]
        console.log("Connected to an account: ", account);
        setCurrentAccount(account);
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
        console.log("Start minting");
        console.log(httpToIpfs(fileUrl))
        let txn = await nftContract.makeAgaveNFT(httpToIpfs(fileUrl));
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
        </a>
      </div>
    );
  }

  const mintNftButton = () => {
    return (
      <div>
        <p>
          Image was uploaded to {httpToIpfs(fileUrl)}
        </p>
        <button onClick={mintNftHandler} className="cta-button mint-nft-button">
          Mint NFT
        </button>
      </div>
    );
  };



  const renderImages = (imageUrls) => {
    return (<div>
      {imageUrls.map(url => {
        return <img src={url}></img>
      })}
    </div>
    );
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  useEffect(() => {
    (async () => {
      loadImageUrls(currentAccount);
      console.log(imageUrls);
    })();
  }, [currentAccount, nftContract]);


  return (
    <div className="main-app">
      <h1>RYUZETSU</h1>
      {currentAccount
        ? <div><h2>My Address: {currentAccount}</h2></div>
        : <div>{connectWalletButton()}</div>
      }
      {/* {currentAccount && fileUrl === "" && (
        <div>{uploadImageButton()}</div>
      )}
      {currentAccount && fileUrl !== "" && (
        <div>{mintNftButton()}</div>
      )} */}
      <h2></h2>
      {renderImages(imageUrls)}
    </div>


  );
}

export default App;