import React from "react";

import "./App.scss";
import ActiveDirectory from "./components/activeDirectory/activeDirectory";
import BackgroundVideo from "./components/controls/backgroundVideo/backgroundVideo";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Navigation from "./components/navigation/navigation";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <main className="app__main">
        <Navigation></Navigation>
        <section className="app__container">
          <ActiveDirectory></ActiveDirectory>
        </section>
      </main>
      <BackgroundVideo />
      <Footer></Footer>
    </div>
  );
}

export default App;
