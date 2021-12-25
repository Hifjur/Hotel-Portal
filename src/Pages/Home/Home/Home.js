import React from "react";
import NavigationBar from "../../Shared/NavigationBar/NavigationBar";

import Hotels from "../Hotels/Hotels";
import SlideShow from "../SlideShow/SlideShow";

const style = {
  marine: 0,
  padding: 0,
};
const Home = () => {
  return (
    <div style={style}>
      <NavigationBar />
      <SlideShow />
      <Hotels />
    </div>
  );
};

export default Home;
