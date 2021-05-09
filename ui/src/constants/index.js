export const VAULT_ABI = require("./abi/vault.json")

export const ETH_VAULT_ABI = require("./abi/ethVault.json")

export const DIVIDEND_TOKEN = require("./abi/dividendToken.json")

export const MAX_UINT = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

export const VAULTS = Object.freeze({
  'ETH': 'WETH',
  'WBTC': 'WBTC',
  'DPI': 'DPI'
})

export const NETWORKS = Object.freeze({
  'MAINNET': 'mainnet',
  'ROPSTEN': 'ropsten',
  'RINKEBY': 'rinkeby',
  'GOERLI': 'goerli',
  'KOVAN': 'kovan'
})

export const EXPLORER_URL = Object.freeze({
  'MAINNET': 'https://etherscan.io',
  'ROPSTEN': 'https://ropsten.etherscan.io',
  'RINKEBY': 'https://rinkeby.etherscan.io',
  'GOERLI': 'https://goerli.etherscan.io',
  'KOVAN': 'https://kovan.etherscan.io'
})
