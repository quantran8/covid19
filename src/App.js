import Footer from 'component/Footer';
import Login from 'component/Login';
import News from 'component/News';
import Registed from 'component/Registed';
import World from 'component/World';
import MenuAppBar from 'custom/Bar';
import BackToTop from 'custom/Scoll';
import HomePage from 'features/HomePage';
import fireBase from 'firebase';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { getCovidData } from 'slice/covidSlice';
import { getUser } from 'slice/userSlice';
import './App.scss';
import Map from 'component/Map';

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

//   FirestoreDB.collection("users").add({
//    helper:["ok,",1,2],
//    ob:{
//      name:"quan",
//      age:21
//    }
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });
  
const unsub = FirestoreDB.collection("users").where("name","==","quan").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(doc.data());
  });
 
  // const data = await getAddress();
  // console.log(data);
});

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
          <Route path="/registed">
            <Registed />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/helperform">
            <HelperForm />
          </Route>
        </Switch>
        <Footer />
        <BackToTop />
      </div>
    </AnimatePresence>
  );
}

export default App;
