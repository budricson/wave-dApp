import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("")
   const contractAddress = "0x363944406a40c54431103329199AE90Fef5A6CfF"
   const contractABI = abi.abi
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  

 
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}

  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 if you're hiring!
        </div>

        <div className="bio">
          Hey, I'm Dominykas, I want to quit my normie job and go full-time into web3. I built this dApp for employers to wave at me on the blockchain.
        </div> <br /> 

    
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="button-17" onClick={connectWallet}>
            Step 1: Connect Wallet With Fake ETH ✨ 
          </button> 
          
        )}

        <br /> <button className="button-17" onClick={null}>
          Step 2: Wave 👋
        </button> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> 

        <div className="bio">
          Want to discuss how I plan to lead your company forth into web3 victory? <br /> 📧 <a href="mailto:hello@dominykas.work">hello@dominykas.work</a>
        </div> <br />  <br /> 
      </div>
    </div>
  );
}

export default App