import axios from 'axios';
const { ethers } = require('ethers')



export default async function handler(req, res) {
    const data = req.body;

    const wallet = req.query.wallet ? req.query.wallet : "0x22f45E683b2574eFe3b2d82642E4176Fa1967c42";

    const JUTC = '0xd22152c99DB34d67e50Ae84855e0e2800A6D29e6'
    const LOCKER = '0x6e69aBfe7Ffa204d79ff71341d7664A9D1083A59'
    const RPC_URL = 'https://goerli.infura.io/v3/65da60a1c7fb43108a80a0feb9405e4d'

    const ERC20ABI = [
        "function balanceOf(address) view returns (uint256)"
    ]

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
    const jutcContract = new ethers.Contract(JUTC, ERC20ABI, provider)
    const lockerContract = new ethers.Contract(LOCKER, ERC20ABI, provider)

    const balance = await jutcContract.balanceOf(wallet)
    const stakedBalance = await lockerContract.balanceOf(wallet)

    const walletBalanceHuman = ethers.utils.formatUnits(balance, 18);
    const stakedBalanceHuman = ethers.utils.formatUnits(stakedBalance, 18);

    res.status(200).json({ "wallet_balance": walletBalanceHuman, "staked_balance": stakedBalanceHuman })
}