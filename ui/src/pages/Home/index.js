import React from "react";
import { Fade } from "react-reveal";

import Container from "../../common/Container";
import Tabs from "../../components/Home/Tabs";

const Home = () => {
  return (
    <Container>
      <Fade bottom>
        <Tabs />
      </Fade>
    </Container>
  );
};

export default Home;
