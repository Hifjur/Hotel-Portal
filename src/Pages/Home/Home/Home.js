import React from "react";
import Hotels from "../Hotels/Hotels";

const style = {
  marine: 0,
  padding: 0,
};
const Home = () => {
  return (
    <div style={style}>
      <h1>Home</h1>
      <Hotels />
    </div>
  );
};

export default Home;
