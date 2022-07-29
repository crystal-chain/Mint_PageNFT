import {pinJSONToIPFS} from './pinata.js'
require('dotenv').config();
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(infuraKey);
const contractABI = require('../contract-abi.json')
const contractAddress = "0x65E24F8dAf6d7C7F92A916Ec0f95Fc32D74316D7";
export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

export const generateSac = async(url, numeroserie, modele, couleur, taille, description) => {
    //error handling
    if (url.trim() == "" || numeroserie.trim() == "" || modele.trim() == "" || couleur.trim() == "" || taille.trim() == "" || description.trim() == "") { 
      return {
       success: false,
       status: "❗Please make sure all fields are completed before minting.",
      }
     }

    //make metadata
    const metadata = new Object();
    metadata.image = url;
    metadata.numeroserie = numeroserie;
    metadata.modele = modele;
    metadata.couleur = couleur;
    metadata.taille = taille; 
    metadata.description = description;

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;    

     
     //set up your Ethereum transaction
     window.contract = await new web3.eth.Contract(contractABI, contractAddress);
const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.generateSac(window.ethereum.selectedAddress, tokenURI).encodeABI()//make call to NFT smart contract 
};



//sign the transaction via Metamask
try {
const txHash = await window.ethereum
    .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
return {
    success: true,
    status: "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash
}
} catch (error) {
return {
    success: false,
    status: "😥 Something went wrong: " + error.message
}

}    
   }