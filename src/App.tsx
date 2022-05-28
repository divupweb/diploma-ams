import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.scss";
import ActiveDirectory from "./components/activeDirectory/activeDirectory";
import BackgroundVideo from "./components/controls/backgroundVideo/backgroundVideo";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Navigation from "./components/navigation/navigation";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header></Header>
          <main className="app__main">
            <Navigation></Navigation>
            <section className="app__container">
              <Routes>
                <Route index element={null}></Route>
                <Route
                  path="active_directory"
                  element={<ActiveDirectory></ActiveDirectory>}
                ></Route>
              </Routes>
            </section>
          </main>
          <BackgroundVideo />
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
