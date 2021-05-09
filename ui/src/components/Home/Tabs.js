import React, { useState, useContext } from "react";
import { Tabs, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

//
import { AppContext } from "../../router";
import * as S from "./styles";
import Input from "../../common/Input";
import {
  VAULTS,
  VAULT_ABI,
  ETH_VAULT_ABI
} from "../../constants";

import {
  formatNumber,
  unlockTokens,
  unixToReadable,
  doesTokenUnlocked,
  getContractInstance,
  getWeiFromEthCustom,
  getEthFromWeiCustom
} from "../../helpers"

const { TabPane } = Tabs;

const MultipleTabs = () => {
  const { Panel } = Collapse;
  const [depositValue, setDepositValue] = useState(10);
  const [withdrawValue, setWithdrawValue] = useState(10);
  const [dividendValue, setDividendValue] = useState(0);
  const [userDepositsAmount, setUserDepositsAmount] = useState(0);
  const [lastDistribution, setLastDistribution] = useState('N/A');
  const { walletAddress } = useContext(AppContext);

  const callback = async (vault) => {
    if (vault) {
      await getAvailableDividend(vault);
      await getLastDistribution(vault);
      await getUserDepositsAmount(vault);
    }
  }

  const handleDepositValueChange = (event) => {
    setDepositValue(event.target.value);
  };

  const handleWithdrawValueChange = (event) => {
    setWithdrawValue(event.target.value);
  };

  const EthHeader = () => (
    <S.HeaderStyle>
      <div className="token-info">
        <img
          src="https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330"
          alt="yUSD"
        />
        <img
          src="https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1547036627"
          alt="WETH"
        />
        <p> yUSD to { VAULTS.ETH } Yield Token </p>
      </div>
      <div className="tag">
        <span> 9.13% APY </span>
      </div>
    </S.HeaderStyle>
  );

  const WbtcHeader = () => (
    <S.HeaderStyle>
      <div className="token-info">
        <img
          src="https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330"
          alt="yUSD"
        />
        <img
          src="https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"
          alt="Wrapped Bitcoin"
        />
        <p> yUSD to { VAULTS.WBTC } Yield Token </p>
      </div>
      <div className="tag">
        <span> 9.13% APY </span>
      </div>
    </S.HeaderStyle>
  );

  const DpiHeader = () => (
    <S.HeaderStyle>
      <div className="token-info">
        <img
          src="https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330"
          alt="yUSD"
        />
        <img
          src="https://assets.coingecko.com/coins/images/12465/small/defi_pulse_index_set.png?1600051053"
          alt="DeFi Pulse Index"
        />
        <p> yUSD to { VAULTS.DPI } Yield Token </p>
      </div>
      <div className="tag">
        <span> 9.13% APY </span>
      </div>
    </S.HeaderStyle>
  );

  const depositVault = async (vault) => {
    const contractInstance = getVaultInstance(vault);
    const depositedAmount = getWeiFromEthCustom(depositValue, 6);
    const underlyingTokenAddr = await contractInstance.methods.underlying().call();

    const doesUnlocked = await doesTokenUnlocked(walletAddress, contractInstance._address, underlyingTokenAddr, depositedAmount);
    if (!doesUnlocked) {
      await unlockTokens(walletAddress, contractInstance._address, underlyingTokenAddr);
    }

    await contractInstance.methods.deposit(depositedAmount).send({ from: walletAddress }); // yUSD has 6 decimals
  }

  const withdraw = async (vault) => {
    const contractInstance = getVaultInstance(vault);
    const withdrawAmount = getWeiFromEthCustom(depositValue, 18); // share token ha 18 decimals

    await contractInstance.methods.withdraw(withdrawAmount).send({ from: walletAddress }); // yUSD has 6 decimals
  }

  const claim = async (vault) => {
    const contractInstance = getVaultInstance(vault);
    await contractInstance.methods.claim().send({ from: walletAddress });
  }

  const getAvailableDividend = async (vault) => {
    if (walletAddress) {
      const contractInstance = getVaultInstance(vault);
      const userDividends = await contractInstance.methods.dividendOf(walletAddress).call();
      const underlyingTokenDecimal = getUnderlyingTokenDecimal(vault);
      setDividendValue(formatNumber(getEthFromWeiCustom(userDividends, underlyingTokenDecimal)));
    }
  }

  const getLastDistribution = async (vault) => {
    if (walletAddress) {
      const contractInstance = getVaultInstance(vault);
      const lastDistrTimestamp = await contractInstance.methods.lastDistribution().call();
      const date = unixToReadable(lastDistrTimestamp.toString() * 1000)
      setLastDistribution(date);
    }
  }

  const getUserDepositsAmount = async (vault) => {
    if (walletAddress) {
      const contractInstance = getVaultInstance(vault);
      const userBalance = await contractInstance.methods.balanceOf(walletAddress).call();
      setUserDepositsAmount(formatNumber( getEthFromWeiCustom(userBalance, 18)));
    }
  }

  const getVaultInstance = (vault) => {
    let vaultAddress, abi

    switch (vault) {
      case VAULTS.ETH:
        vaultAddress = process.env.REACT_APP_WETH_VAULT_ADDRESS;
        abi = ETH_VAULT_ABI;
        break;
      case VAULTS.WBTC:
        vaultAddress = process.env.REACT_APP_WBTC_VAULT_ADDRESS;
        abi = VAULT_ABI;
        break;
      case VAULTS.DPI:
        vaultAddress = process.env.REACT_APP_DPI_VAULT_ADDRESS;
        abi = VAULT_ABI;
        break;
      default:
        break;
    }

    return getContractInstance(vaultAddress, abi);
  }

  const getUnderlyingTokenDecimal = (vault) => {
    let decimal

    switch (vault) {
      case VAULTS.ETH:
        decimal = 18;
        break;
      case VAULTS.WBTC:
        decimal = 8;
        break;
      case VAULTS.DPI:
        decimal = 18;
        break;
      default:
        break;
    }

    return decimal;
  }

  return (
    <S.Container>
      <S.Title>Earn X on your Y</S.Title>
      <S.Description>
        Dollar-Cost Average your stablecoin yield into your favorite crypto.
      </S.Description>

      <Collapse
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        expandIconPosition="right"
        className="site-collapse-custom-collapse"
        onChange={callback}
        accordion
      >
        <Panel header={EthHeader()} key={VAULTS.ETH}>
          <Tabs type="card" defaultActiveKey="1">
            <TabPane tab="Deposit" key="1">
              <S.Deposit>
                <div>
                  <p>Strategy</p>
                  <span>Yearn V2</span>
                </div>
                <br />
                <p>yUSD amount</p>
                <Input
                  onChange={handleDepositValueChange}
                  type="number"
                  name="value"
                  value={depositValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => depositVault(VAULTS.ETH)} disabled={!walletAddress}>Deposit</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>{ dividendValue } { VAULTS.ETH }</span>
                </div>
                <br />
                <div>
                  <span>Last distribution:</span>
                  <p>{ lastDistribution }</p>
                </div>
                <div className="buttons">
                  <S.Button onClick={() => claim(VAULTS.ETH)} disabled={!walletAddress}>Claim { VAULTS.ETH }</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p disabled={!walletAddress}>Deposited amount</p>
                  <span>{ userDepositsAmount } yUSD</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleWithdrawValueChange}
                  type="number"
                  name="value"
                  value={withdrawValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => withdraw(VAULTS.ETH)} disabled={!walletAddress}>Withdraw</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>

        <Panel header={WbtcHeader()} key={VAULTS.WBTC}>
          <Tabs type="card" defaultActiveKey="1">
            <TabPane tab="Deposit" key="1">
              <S.Deposit>
                <div>
                  <p>Strategy</p>
                  <span>Yearn V2</span>
                </div>
                <br />
                <p>yUSD amount</p>
                <Input
                  onChange={handleDepositValueChange}
                  type="number"
                  name="value"
                  value={depositValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => depositVault(VAULTS.WBTC)} disabled={!walletAddress}>Deposit</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>{ dividendValue } { VAULTS.WBTC }</span>
                </div>
                <br />
                <div>
                  <span>Last distribution:</span>
                  <p>{ lastDistribution }</p>
                </div>
                <div className="buttons">
                  <S.Button onClick={() => claim(VAULTS.WBTC)} disabled={!walletAddress}>Claim { VAULTS.WBTC }</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p disabled={!walletAddress}>Deposited amount</p>
                  <span>{ userDepositsAmount } yUSD</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleWithdrawValueChange}
                  type="number"
                  name="value"
                  value={withdrawValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => withdraw(VAULTS.WBTC)} disabled={!walletAddress}>Withdraw</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>

        <Panel header={DpiHeader()} key={VAULTS.DPI}>
          <Tabs type="card" defaultActiveKey="1">
            <TabPane tab="Deposit" key="1">
              <S.Deposit>
                <div className="mb-2">
                  <p>Strategy</p>
                  <span>Yearn V2</span>
                </div>
                <br />
                <p>yUSD amount</p>
                <Input
                  onChange={handleDepositValueChange}
                  type="number"
                  name="value"
                  value={depositValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => depositVault(VAULTS.DPI)} disabled={!walletAddress}>Deposit</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>{ dividendValue } { VAULTS.DPI }</span>
                </div>
                <br />
                <div>
                  <span>Last distribution:</span>
                  <p>{ lastDistribution }</p>
                </div>
                <div className="buttons">
                  <S.Button onClick={() => claim(VAULTS.DPI)} disabled={!walletAddress}>Claim { VAULTS.DPI }</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p disabled={!walletAddress}>Deposited amount</p>
                  <span>{ userDepositsAmount } yUSD</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleWithdrawValueChange}
                  type="number"
                  name="value"
                  value={withdrawValue || ""}
                />
                <div className="buttons">
                  <S.Button onClick={() => withdraw(VAULTS.DPI)} disabled={!walletAddress}>Withdraw</S.Button>
                </div>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>
      </Collapse>
    </S.Container>
  );
};

export default MultipleTabs;
