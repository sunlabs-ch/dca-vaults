import { EXPLORER_URL, NETWORKS, DIVIDEND_TOKEN, MAX_UINT } from "../constants";
import { fromWei, toChecksumAddress, toWei, isAddress } from 'web3-utils';
import { BigNumber } from "bignumber.js";

/**
 * @function shortenAddress
 *
 * @param {String} address - Full ETH address
 * @param {Number} charsStart - Letters from start
 * @param {Number} charsEnd - Letters from end
 * @return {String} - Shortened address, ex: 0xAbC...XyZ
 */
export const shortenAddress = (address, charsStart = 3, charsEnd = 3) => {
  return `${address.substring(0, charsStart + 2)}...${address.substring(
    address.length - charsEnd,
    address.length,
  )}`
}

/**
 * @function getNetworkName
 *
 * @param {Number} networkId - Network ID
 * @return {String} - Network name
 */
export const getNetworkName = (networkId) => {
  switch (networkId) {
    case 1:
      return NETWORKS['MAINNET']
    case 3:
      return NETWORKS['ROPSTEN']
    case 4:
      return NETWORKS['RINKEBY']
    case 5:
      return NETWORKS['GOERLI']
    case 42:
      return NETWORKS['KOVAN']
    default:
      return null
  }
}

/**
 * @function getNetworkExplorer
 *
 * @dev By default it returns URL of the Mainnet.
 * @param {Number} networkId - Network ID
 * @return {String} - Network explorer URL
 */
export const getNetworkExplorer = (networkId = 1) => {
  switch (networkId) {
    case 1:
      return EXPLORER_URL['MAINNET']
    case 3:
      return EXPLORER_URL['ROPSTEN']
    case 4:
      return EXPLORER_URL['RINKEBY']
    case 5:
      return EXPLORER_URL['GOERLI']
    case 42:
      return EXPLORER_URL['KOVAN']
    default:
      return null
  }
}

/**
 * @function numberWithCommas
 *
 * @param {number | string} num - Numeric value
 * @return {string} - Return number in position format
 */
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * @function formatNumber
 *
 * @param {number|string} n - Number to be formatted
 * @param {number} d - Number to decimals to be parsed and displayed
 * @return {number} - Formatted number to be displayed on the UI
 */
export function formatNumber(n, d = 3) {
  return parseFloat(Number(n).toFixed(d))
}

/**
 * @function getEthFromWei
 *
 * @param {string} wei - Wei value to be converted
 * @param {string} unit - Unit of input value provided
 * @return {string} - Return ETH value
 */
export const getEthFromWei = (wei, unit = 'ether') => fromWei(wei, unit);

/**
 * @function isEthAddress
 *
 * @param {string} address - Address for validation
 * @return {string} - Return bool
 */
export const isEthAddress = (address) => isAddress(address);

/**
 * @function getWeiFromEth
 *
 * @param {string} eth - ETH value to be converted
 * @param {string} unit - Unit of input value provided
 * @return {string} - Return Wei value
 */
export const getWeiFromEth = (eth, unit = 'ether') => toWei(eth, unit);

/**
 * @function getEthFromWeiCustom
 *
 * @param {string} wei - Wei value to be converted
 * @param {string} decimal - Unit (numerical) of input value provided
 * @return {string} - Return ETH value
 */
export const getEthFromWeiCustom = (wei, decimal = 18) => {
  wei = BigNumber(wei.toString())
  decimal = BigNumber(decimal.toString())

  if (decimal === '18') return getEthFromWei(wei)
  else return wei.dividedBy(BigNumber('10').pow(decimal)).toString()
}

/**
 * @function getWeiFromEthCustom
 *
 * @param {string} amount -Eth value to be converted to wei
 * @param {string} decimal - Unit (numerical) of input value provided
 * @return {string} - Return ETH value
 */
export const getWeiFromEthCustom = (amount, decimal = 18) => {
  amount = amount.toString()
  decimal = decimal.toString()

  if (decimal === '18') return getWeiFromEth(amount)
  else return BigNumber(amount).multipliedBy(BigNumber((10**decimal))).integerValue()
}

/**
 * @function getChecksumAddress
 *
 * @param {string} address - ETH address
 * @return {string} - Return checksummed address
 */
export const getChecksumAddress = (address) => toChecksumAddress(address);

/**
 * @function getContractInstance
 *
 * @param {string} address - Address of smart contract
 * @param {json} abi - Interface of smart contract
 * @return {string} - Contract instance
 */
export const getContractInstance = (address, abi) => {
  return new window.web3.eth.Contract(abi, address);
}

/**
 * @function doesTokenUnlocked
 */
export const doesTokenUnlocked = async (user, spender, token, amount) => {
  const tokenInstance = getContractInstance(token, DIVIDEND_TOKEN);
  const allowance = await tokenInstance.methods.allowance(user, spender).call();
  return allowance.toString() >= amount.toString();
}

/**
 * @function unlockTokens
 */
export const unlockTokens = async (user, spender, token) => {
  const tokenInstance = getContractInstance(token, DIVIDEND_TOKEN);
  await tokenInstance.methods.approve(spender, MAX_UINT).send({ from: user });
}

/**
 * @function unixToReadable
 */
export const unixToReadable = (unix) => {
  const today = new Date(unix);
  const result = today.getUTCFullYear() + '-' +
    ('00' + (today.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + today.getUTCDate()).slice(-2) + ' ' +
    ('00' + today.getUTCHours()).slice(-2) + ':' +
    ('00' + today.getUTCMinutes()).slice(-2) + ':' +
    ('00' + today.getUTCSeconds()).slice(-2);

  return result;
}