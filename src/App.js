import { getCovidData } from 'auth/covid';
import { getUser } from 'auth/slice';
import Footer from 'component/Footer';
import Login from 'component/Login';
import Registed from 'component/Registed';
import MenuAppBar from 'custom/Bar';
import Main from 'features/chart/main';
import fireBase from 'firebase';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import World from 'features/chart/World';
import News from 'features/chart/News';
import BackToTop from 'features/chart/Scoll';
import './App.scss';
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(async () => {
    const unregister = fireBase.auth().onAuthStateChanged(async (user) => {
      if (!user) console.error('no user');
      const res = await dispatch(getUser()).unwrap();
    });

    return () => unregister();
  }, []);

  useEffect(async () => {
    const res = await dispatch(getCovidData()).unwrap();
    console.log(res);
  }, []);
  return (
    <AnimatePresence>
      <div className="App">
        <MenuAppBar />
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/world">
            <World />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registed">
            <Registed />
          </Route>
        </Switch>
        <Footer />
        <BackToTop />
      </div>
    </AnimatePresence>
  );
}

export default App;
