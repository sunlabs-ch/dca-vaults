import React, { Suspense, createContext, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../pages/Home";

export const AppContext = createContext();

const Router = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <Suspense>
      <AppContext.Provider value={{ walletAddress, setWalletAddress }}>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
        </Switch>
      </AppContext.Provider>
    </Suspense>
  );
};

export default Router;
