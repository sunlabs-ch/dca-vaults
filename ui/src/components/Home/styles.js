import styled from "styled-components";

export const Title = styled.p`
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
`;

export const Description = styled.p`
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
  margin-bottom: 2em;
`;

export const EmptyList = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  border-radius: 4px;
  border: 1px dashed #dad7e2;

  p {
    font-size: 1rem;
    color: #9b97b3;
  }
`;

// Tabs Styles
export const Container = styled.div`
  max-width: 800px;
  text-align: left;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;

  .site-collapse-custom-collapse {
    background: #fff;
    border: none;
    border-bottom: none;
    box-shadow: 0 0.125em 0.25em rgb(10 10 10 / 10%);

    .ant-collapse-item {
      border-bottom: none;
    }

    .ant-collapse-arrow {
      top: 15.0005px !important;
    }

    .ant-collapse-content-box {
      padding: 3em;
    }
  }

  .ant-tabs-card .ant-tabs-tab,
  [data-theme="compact"] .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
    min-width: 200px;
  }

  .ant-tabs-tab-btn {
    min-width: 200px;
    text-align: center;
    font-size: 1rem;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ffff;
  }

  .ant-tabs-tab {
    border: 1px solid #f2f2f2 !important;
  }

  .ant-tabs-card .ant-tabs-tab-active,
  [data-theme="compact"] .ant-tabs-card .ant-tabs-tab-active {
    background: #2d2ce5;
    /* border-color: #f2f2f2; */
  }
`;

export const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .token-info {
    display: flex;
    flex-grow: 1;

    img {
      height: 2em;
      width: 2em;
      /* max-width: 100%; */
      margin-left: 0.3em;
    }

    p {
      color: #363636;
      margin-left: 0.4em;
      font-weight: 700;
      margin-bottom: 0;
    }
  }

  .tag {
    display: none;

    background-color: #f5f5f5;
    border-radius: 4px;
    color: #4a4a4a;
    font-size: 0.75rem;
    align-items: center;
    justify-content: center;
    padding: 0.75em;
    white-space: nowrap;
  }
`;

export const Deposit = styled.div`
  p {
    color: #363636;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  span {
    color: #4a4a4a;
    font-size: 1.2rem;
  }

  label {
    color: #363636;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1em;
  }

  .buttons {
    display: flex;

    button {
      margin: 30px;
    }
  }
`;

export const Claim = styled.div`
  p {
    color: #363636;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  span {
    color: #4a4a4a;
    font-size: 1.2rem;
  }

  .buttons {
    display: flex;

    button {
      margin: 30px;
    }
  }
`;

export const Withdraw = styled.div`
  .buttons {
    display: flex;

    button {
      margin: 30px;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: #2d2ce5;
  border: 2px solid transparent;
  padding: 15px 20px;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  transition: 0.2s;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  &.grey {
    background: #fff;
    color: #4a4a4a;
    border: 1px solid #4a4a4a;
  }
  &:disabled {
    background-color: #bbbaba;
    cursor: not-allowed;
  }
`;
