import React, { useState } from "react";
import { Tabs, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

//
import * as S from "./styles";
import Input from "../../common/Input";

const { TabPane } = Tabs;

const MultipleTabs = () => {
  const { Panel } = Collapse;
  const [value, setValue] = useState({});

  const callback = (key) => {
    //
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const WethHeader = () => (
    <S.HeaderStyle>
      <div className="token-info">
        <img
          src="https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330"
          alt="yUSD"
        />
        <img
          src="https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1547036627"
          alt="Ethereum"
        />
        <p> yUSD to ETH Yield Token </p>
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
        <p> yUSD to WBTC Yield Token </p>
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
        <p> yUSD to DPI Yield Token </p>
      </div>
      <div className="tag">
        <span> 9.13% APY </span>
      </div>
    </S.HeaderStyle>
  );

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
      >
        <Panel header={WethHeader()} key="1">
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
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Deposit</S.Button>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>0.0 ETH</span>
                </div>
                <br />
                <p>Last distribution: a day ago</p>
                <div className="buttons">
                  <S.Button className="grey">Claim WETH</S.Button>
                  <S.Button>Claim ETH</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p>Deposited amount</p>
                  <span>0.00 USDC</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Withdraw</S.Button>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>

        <Panel header={WbtcHeader()} key="2">
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
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Deposit</S.Button>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>0.0 ETH</span>
                </div>
                <br />
                <p>Last distribution: a day ago</p>
                <div className="buttons">
                  <S.Button>Claim WBTC</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p>Deposited amount</p>
                  <span>0.00 USDC</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Withdraw</S.Button>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>

        <Panel header={DpiHeader()} key="3">
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
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Deposit</S.Button>
              </S.Deposit>
            </TabPane>
            <TabPane tab="Claim" key="2">
              <S.Claim>
                <div>
                  <p>Available Profits</p>
                  <span>0.0 ETH</span>
                </div>
                <br />
                <p>Last distribution: a day ago</p>
                <div className="buttons">
                  <S.Button>Claim DPI</S.Button>
                </div>
              </S.Claim>
            </TabPane>
            <TabPane tab="Withdraw" key="3">
              <S.Deposit>
                <div>
                  <p>Deposited amount</p>
                  <span>0.00 USDC</span>
                </div>
                <br />
                <p>Amount to withdraw</p>
                <Input
                  onChange={handleChange}
                  type="number"
                  name="value"
                  value={value || ""}
                />
                <S.Button>Withdraw</S.Button>
              </S.Deposit>
            </TabPane>
          </Tabs>
        </Panel>
      </Collapse>
    </S.Container>
  );
};

export default MultipleTabs;
