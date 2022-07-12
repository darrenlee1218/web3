# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Introduction

1. Wallet availability and wallet connection

A Web3Provider wraps a standard Web3 provider, which is what MetaMask injects as window.ethereum into each page.

### `const provider = new ethers.providers.Web3Provider(window.ethereum)`

MetaMask requires requesting permission to connect users accounts

### `await provider.send("eth_requestAccounts", [])`

The MetaMask plugin also allows signing transactions to send ether and pay to change state within the blockchain.
For this, you need the account signer...

### `const signer = provider.getSigner()`

2. Wallet balance, address and chain Id.

The chain ID that MetaMask will use to sign transactions for the network.

### `let chainId = ethereum.networkVersion`

Balance and address

### ` let bal = await provider.getBalance(accounts[0])`

### ` let balance = ethers.utils.formatEther(bal)`

3. signed hash and public key

This is causing signed hash value based on random message with hash value.

### `const signed_hash = await signer.signMessage(message)`

### `const publickey = await signer.getAddress()`

4. ENS and ENS avatar

ENS is to map human-readable names 'ehtereum.eth' to machine-readable identifiers such as Ethereum addresses like '0x09123...', it looks like DNS.

### `let name = await provider.lookupAddress(accounts[0])`

### `let avatar = await provider.getAvatar(name || '')`
