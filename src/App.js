import logo from './logo.svg';
import './App.css';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { useAccount, useAccountEffect, useDisconnect, useReadContracts, useSignMessage, useWriteContract, useWaitForTransactionReceipt, useConfig, useGasPrice } from 'wagmi';
import { waitForTransactionReceipt } from "@wagmi/core";
import { useEffect, useState } from 'react';
import Environment from './utils/Environment'
import abi from './utils/abi.json'
function App() {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const {data: hash, writeContract, isPending, isSuccess } = useWriteContract()
  const [apprAmount, setAppAmount] = useState('')
  const config = useConfig();
  const gas = useGasPrice()
  const [loader, setLoader]=useState(false)
  // let result = useWaitForTransactionReceipt({
  //   hash: hash,
  //   query: { enabled: hash !== undefined }
  // })
  const { signMessage } = useSignMessage({
    mutation: {
      onError(error) {
        localStorage.removeItem('sign')
        disconnect()
        console.log('Disconnected!', error)
      }
    }
  })
  useAccountEffect({
    onConnect(data) {
      //  data.address && refetch()
      // console.log(data);
      let signData = localStorage.getItem('sign')

      if (!signData) {
        signMessage({ message: data?.address })
        localStorage.setItem('sign', data?.address)

      }

    },
    onDisconnect() {
      localStorage.removeItem('sign')
      // console.log('Disconnected!')
    },
  })
  const usdtContract = {
    address: Environment?.usdt,
    abi: abi,
  }
  const { data: allowanceData, refetch } = useReadContracts({
    contracts: [
      {
        ...usdtContract,
        functionName: 'totalSupply',
      },
      {
        ...usdtContract,
        functionName: 'allowance',
        args: [address, Environment.usdt],
      },
    ],
    query: { enabled: !!address, gcTime: Infinity }, // This ensures the query will only execute if address is truthy
  });
  const handleTransactionSubmitted = async (txHash) => {
    console.log(txHash);
    setLoader(true);
    const transactionReceipt = await waitForTransactionReceipt(config,{
      hash: txHash ,
    });
    setLoader(false);
    // at this point the tx was mined
    if (transactionReceipt.status === "success") {
      // execute your logic here
      setAppAmount()
      refetch()
      // window.alert('transaction successfully committed')
    }
  };
  async function approve() {
    if (!address || !apprAmount) {
      window.alert('Please connect wallet and enter amount')
      return
    }
     writeContract({
      ...usdtContract,
      functionName: 'approve',
      args: [
        Environment.usdt,
        apprAmount * 1e18,
      ],
},
       {
         onSuccess(hash) {handleTransactionSubmitted(hash)},
       }
    )
  }
//   useEffect(() => {
//    console.log(result, 'rrrrrrr');
// console.log(result.isLoading, 'rrrrrrr');
//   }, [result])
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='flex'>
          {address ?
            <button onClick={disconnect} className='button'>
              Disconnect
            </button>
            :
            <>
              <WalletButton wallet="metamask" />
              <WalletButton wallet="walletconnect" />
            </>
          }


        </div>
        {allowanceData && (
          <div className="info">
            {/* <h5>Read contracts</h5> */}
            <h6>Total Supply: {Number(allowanceData[0]?.result) / 1e18}</h6>
            <h6>Allowance: {Number(allowanceData[1]?.result) / 1e18}</h6>
          </div>
        )}
        <div className="write">
          {/* <h5>Write contracts</h5> */}
          <input
            className='button'
            onChange={(e) => setAppAmount(e.target.value)}
            type='number'
            placeholder="Enter approve amount"
          />
          <button className='button' onClick={approve}>{(isPending || loader) ? 'Loading...' : 'Approve'}</button>
        </div>
        <button className='button' onClick={refetch}>ReFetch</button>
      </header>
    </div>
  );
}

export default App;
