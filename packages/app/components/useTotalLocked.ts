import { BigNumber, providers } from "ethers"
import { erc20ABI, useContractRead } from "wagmi"
import { CHAINS, CONTRACT_ADDRESSES } from "../config"

interface Breakdown {
  // mainnet?: BigNumber
  // gnosisChain?: BigNumber
  // staked?: BigNumber
  bsc?: BigNumber
  goerli?: BigNumber
  staked?: BigNumber
}

// const mainnetProvider = new providers.StaticJsonRpcProvider(
//   CHAINS.find((chain) => chain.id === 56)?.rpcUrls[0],
//   56
// )

const goerliProvider = new providers.JsonRpcProvider(
  CHAINS.find((chain) => chain.id === 5)?.rpcUrls[0],
  5
)

console.log("CHAINS",CHAINS);
console.log("goerliProvider",goerliProvider);

// const gnosisChainProvider = new providers.StaticJsonRpcProvider(
//   CHAINS.find((chain) => chain.id === 5)?.rpcUrls[0],
//   5
// )

// const GNO_ON_MAINNET = "0x6810e776880c02933d47db1b9fc05908e5386b96"
// const GNO_ON_GNOSIS_CHAIN = "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb"
// const GNO_TO_MGNO = "0x647507A70Ff598F386CB96ae5046486389368C66"

//TokenLock contract: 0x6e69aBfe7Ffa204d79ff71341d7664A9D1083A59
//JUTC contract: 0xd22152c99DB34d67e50Ae84855e0e2800A6D29e6

const LOCKER_GOERLI = "0x6e69aBfe7Ffa204d79ff71341d7664A9D1083A59"
const JUTC_GOERLI = "0xd22152c99DB34d67e50Ae84855e0e2800A6D29e6";

const useTotalLocked = (): [BigNumber | undefined, Breakdown] => {
  const [{ data: gnoLockedOnMainnetData }] = useContractRead(
    {
      addressOrName: JUTC_GOERLI,
      contractInterface: erc20ABI,
      signerOrProvider: goerliProvider,
    },
    "balanceOf",
    {
      args: LOCKER_GOERLI ,
    }
  )

  const [{ data: gnoLockedOnGnosisChainData }] = useContractRead(
    {
      addressOrName: JUTC_GOERLI,
      contractInterface: erc20ABI,
      signerOrProvider: goerliProvider,
    },
    "balanceOf",
    {
      args: LOCKER_GOERLI,
    }
  )

  const [{ data: jutcStakedData }] = useContractRead(
    {
      addressOrName: JUTC_GOERLI,
      contractInterface: erc20ABI,
      signerOrProvider: goerliProvider,
    },
    "balanceOf",
    {
      args: LOCKER_GOERLI,
    }
  )

  const gnoLockedOnMainnet = gnoLockedOnMainnetData as BigNumber | undefined
  const gnoLockedOnGnosisChain = gnoLockedOnGnosisChainData as
    | BigNumber
    | undefined
  const jutcStaked = jutcStakedData as BigNumber | undefined

  return [
    gnoLockedOnMainnet &&
      gnoLockedOnGnosisChain &&
      jutcStaked,
      // jutcStaked &&
      // gnoLockedOnMainnet.add(gnoLockedOnGnosisChain).add(jutcStaked),
    {
      bsc: jutcStaked,
      goerli: jutcStaked,
      staked: jutcStaked,
    },
  ]
}

export default useTotalLocked
