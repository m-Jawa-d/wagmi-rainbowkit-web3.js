import React, { useEffect, useState } from 'react';
import './App.css';
import { useAccount, useConnectors, useDisconnect } from 'wagmi';
import { WalletButton } from '@rainbow-me/rainbowkit';
import getWeb3 from './web3';
import Environment from './utils/Environment';
import abi from './utils/abi.json';
// import web3 from './web3';
import Web3 from 'web3';
import { config } from './config';
import { Personal } from 'web3-eth-personal';
import { sepolia } from 'wagmi/chains';
import { useWeb3js, useWeb3jsSigner } from './web3';

function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [apprAll, setApprAll] = useState({ totalSupply: 0, allowance: 0 });
  const [apprAmount, setAppAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const web3 = useWeb3js({ chainId: sepolia.id });
  const web3js = useWeb3jsSigner({ chainId: sepolia.id });
  async function approve() {
    try {
      setLoading(true);
      const contract = new web3js.eth.Contract(abi, Environment.usdt);
      const apprAmountInWei = Web3.utils.toWei(apprAmount, 'ether');
      const gas = await contract.methods.approve(Environment.usdt, apprAmountInWei).estimateGas({from: address});
      await contract.methods.approve(Environment.usdt, apprAmountInWei).send({ from: address, gas });
      setLoading(false);
      setAppAmount('');
    } catch (error) {
      console.error('Error in approve function:', error);
      setLoading(false);
    }
  }
  // function to get personal sign of account
  console.log(address, typeof address);
  async function sign() {
    let message = address
    const hexMessage = Web3.utils.utf8ToHex(message); 
    let sign = await web3js.eth.personal.sign(hexMessage, address, '')
    console.log(sign);
  }
  useEffect(() => {
    async function readContract() {
      const contract = new web3.eth.Contract(abi, Environment.usdt);
      const totalSupply = await contract.methods.totalSupply().call();
      const allowance = await contract.methods.allowance(address, Environment.usdt).call();
      setApprAll({
        totalSupply: Web3.utils.fromWei(totalSupply, 'ether'),
        allowance: Web3.utils.fromWei(allowance, 'ether'),
      });
    }
    if (address) {
      readContract();
    }
  }, [address, !loading]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{address}</p>
        <div className="info">
          <h6>Total Supply: {apprAll.totalSupply}</h6>
          <h6>Allowance: {apprAll.allowance}</h6>
        </div>
        {address && (
          <div className="write">
            <input
              value={apprAmount}
              className='button'
              onChange={(e) => setAppAmount(e.target.value)}
              type='number'
              placeholder="Enter approve amount"
            />
            <button className='button' onClick={approve}>{loading ? 'Loading...' : 'Approve'}</button>
            <button onClick={sign} className='button'>Sign</button>
          </div>
        )}
        {address ? (
          <button onClick={disconnect} className='button'>Disconnect</button>
        ) : (
          <>
            <WalletButton wallet="metamask" />
            <WalletButton wallet="walletconnect" />
          </>
        )}
      </header>
    </div>
  );
}

export default App;


// // const transactionParameters = {
// // from: address, // Your wallet address
//         // gas: await web3js.eth.estimateGas({
//         //   to: Environment.usdt,
//         //   from: address,
//         //   data: contract.methods.approve(Environment.usdt, apprAmountInWei).encodeABI()
//         // }),
//       };