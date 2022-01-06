import Footer from 'component/Footer';
import Login from 'component/Login';
import News from 'component/News';
import Register from 'component/Register';
import World from 'component/World';
import MenuAppBar from 'component/AppBar';
import BackToTop from 'custom/Scoll';
import HomePage from 'features/covid/HomePage';
import fireBase from 'firebase';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Route, Switch, useLocation,Redirect} from 'react-router-dom';
import { getCovidData } from 'features/covid/covidSlice';
import { getUser } from 'features/user/userSlice';
import './App.scss';
import Map from 'component/Map';
import RequestHelpForm from 'component/RequestHelpForm';
import UserPage from 'features/user/UserPage';
import PrivateRoute from 'custom/PrivateRoute';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(async () => {
    const unregister = fireBase.auth().onAuthStateChanged(async (user) => {
      if (!user) console.error('no user');
      const res = await dispatch(getUser()).unwrap();
    });

    return () => unregister();
  }, []);

  useEffect(async () => {
    const res = await dispatch(getCovidData()).unwrap();
  }, []);
  return (
    <AnimatePresence>
      <div className="App">
        <MenuAppBar />
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <HomePage />
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
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/request_help">
            <RequestHelpForm />
          </Route>
          <Route path="/request_help/:id">
            <RequestHelpForm />
          </Route>
          <Route path="/account">
            {user.userInfo.id?<UserPage />:<Login/>}
          </Route>
        </Switch>
        <Footer />
        <BackToTop />
      </div>
    </AnimatePresence>
  );
}

export default App;
