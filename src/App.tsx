import React from "react";

import "./App.scss";
import BackgroundVideo from "./components/controls/backgroundVideo/backgroundVideo";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Footer></Footer>
      <BackgroundVideo />
    </div>
  );
}

export default App;
