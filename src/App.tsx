import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import Auth from "./components/auth/auth";
import StoreType from "./types/storeType";
import { useEffect } from "react";
import { authSliceActions } from "./store/auth/authSlice";

const App: React.FC = () => {
  const isLogged: boolean = useSelector(
    (store: StoreType) => store.auth.isLogged
  );
  const dispath = useDispatch();

  useEffect(() => {
    const access = localStorage.getItem("access");
    access
      ? dispath(authSliceActions.checkToken({ token: access }))
      : dispath(authSliceActions.setLogged(false));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header></Header>

        <main className="app__main">
          {isLogged && <Navigation></Navigation>}
          <section className="app__container">
            <Routes>
              {isLogged === null && <Route index element={null}></Route>}
              {isLogged && <Route index element={null}></Route>}
              {!isLogged && <Route index element={<Auth></Auth>}></Route>}

              {isLogged && (
                <Route
                  path="active_directory"
                  element={<ActiveDirectory></ActiveDirectory>}
                ></Route>
              )}
              {isLogged && (
                <Route path="user_creation" element={<UserCreate />}></Route>
              )}
              {!isLogged && isLogged !== null && (
                <Route
                  path="*"
                  element={<Navigate to={"/"}></Navigate>}
                ></Route>
              )}
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
  );
};

export default App;
