import { Chain, chain } from "wagmi"

export const LOCKED_TOKEN_NAME = "Jandra Token"
export const LOCKED_TOKEN_SYMBOL = "JUTC"
export const CLAIM_TOKEN_NAME = "Jandra Token V2"
export const CLAIM_TOKEN_SYMBOL = "veJUTC"

export const INFURA_ID =
  process.env.NODE_ENV === "development"
    ? "65da60a1c7fb43108a80a0feb9405e4d"
    : "65da60a1c7fb43108a80a0feb9405e4d"

const addInfuraProjectId = (chain: Chain) => ({
  ...chain,
 rpcUrls: ["https://goerli.infura.io/v3/65da60a1c7fb43108a80a0feb9405e4d"]
  // rpcUrls: chain.rpcUrls.map((url) =>
  //   url.endsWith("infura.io/v3") ? `${url}/${INFURA_ID}` : url
  // ),
})

// console.log("addInfuraProjectId",addInfuraProjectId);

// used for price lookup
export const COINGECKO_TOKEN_ID = "gnosis"

// The first item will be used as the default chain
export const CHAINS: Chain[] = [
  // ...(process.env.NODE_ENV === "development"
  //   ? [addInfuraProjectId(chain.goerli)]
  //   : []),

  // addInfuraProjectId(chain.mainnet),
  addInfuraProjectId(chain.goerli),

  // {
  //   id: 100,
  //   name: "Gnosis Chain",
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: "xDai",
  //     symbol: "xDAI",
  //   },
  //   rpcUrls: ["https://rpc.gnosischain.com/"],
  //   blockExplorers: [
  //     { name: "Blockscout", url: "https://blockscout.com/xdai/mainnet" },
  //   ],
  // },
]

//Goerli contracts
//TokenLock contract: 0x6e69aBfe7Ffa204d79ff71341d7664A9D1083A59
//JUTC contract: 0xd22152c99DB34d67e50Ae84855e0e2800A6D29e6
export const CONTRACT_ADDRESSES: { [chainId: number]: string } = {
  // 1: "0x4f8AD938eBA0CD19155a835f617317a6E788c868",
  5: "0x6e69aBfe7Ffa204d79ff71341d7664A9D1083A59",
  // 97: "0x4f8AD938eBA0CD19155a835f617317a6E788c868",
  // 100: "0xd4Ca39f78Bf14BfaB75226AC833b1858dB16f9a1",

  // 4: "0x01FD5975E40D16838a7213e2fdfFbBBA4477c14d", // deposit period ongoing
  // 4: "0x88c6501d5C2475F5a0343847A12cEA0090458013", // lock period ongoing
  // 4: "0xF7a579Cc9c27488f13C1F16036a65810fa1Ca3CC", // lock period over
}
