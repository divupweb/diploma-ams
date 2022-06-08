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
import Notifications from "./components/notifications/notifications";
import PreLoader from "./components/controls/preLoader/preLoader";
import Confirmation from "./components/confirmation/confirmation";
import UserCreate from "./components/userCreate/userCreate";

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
                <Route path="user_creation" element={<UserCreate />}></Route>
              </Routes>
            </section>
          </main>
          <BackgroundVideo />
          <Notifications></Notifications>
          <PreLoader></PreLoader>
          <Confirmation></Confirmation>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
