import React from "react";
import Footer from "../../Shared/Footer/Footer";
import NavigationBar from "../../Shared/NavigationBar/NavigationBar";
import Employee from "../Employee/Employee";

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
      <Employee />
      <Footer />
    </div>
  );
};

export default Home;
