import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function CardBox() {
  const [haveMetamask, setHaveMetamask] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [chainId, setChainId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [signedHash, setSignedHash] = useState<string>('');
  const [publickey, setPublickey] = useState<string>('');
  const [ens, setEns] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      !ethereum ? setHaveMetamask(false) : setHaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setHaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      //wallet balance and chain Id
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      let chainId = ethereum.networkVersion;

      //signed hash and public key
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      //ens and provider.getAvatar
      let name = await provider.lookupAddress(accounts[0]);
      let avat = await provider.getAvatar(name || '');

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setChainId(chainId);
      setSignedHash(signature);
      setPublickey(address);
      setEns(name || '');
      setAvatar(avat || '');
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setMessage('');
  };

  return (
    <>
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Chain ID:</h3>
                  <p>{chainId}</p>
                </div>
                {ens ? (
                  <div className="card-row">
                    <h3>ENS:</h3>
                    <p>{ens}</p>
                  </div>
                ) : (
                  <></>
                )}
                {avatar ? (
                  <div className="card-row">
                    <h3>Avatar:</h3>
                    <p>{avatar}</p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="card-row">
                  <h3>Signed hash:</h3>
                  <p>{signedHash.slice(0, 4)}...</p>
                  <p>{signedHash.slice(-5, -1)}</p>
                </div>
                <div className="card-row">
                  <h3>Public Key:</h3>
                  <p>{publickey.slice(0, 4)}...</p>
                  <p>{publickey.slice(38, 42)}</p>
                </div>
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
                <div className="card-row">
                  <button className="btn" onClick={() => disconnectWallet()}>
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="Please input a message"
                    value={message}
                    className="txt"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button className="btn" onClick={connectWallet}>
                  Connect
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </>
  );
}
