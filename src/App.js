import './App.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from './accountSlice';
import { getProfile } from './lib/spotifyConfig';
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Login from './Page/Login';
import CreatePlaylist from './Page/CreatePlaylist';
import UserProfile from './Page/UserProfile';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const isLogin = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');

    if (access_token !== null) {
      const userProfile = async () => {
        try {
          const response = await getProfile(access_token);
          dispatch(
            login({
              token: access_token,
              user: response,
            })
          )
          
        } catch (e) {
          toast.error(e);
        }
      }
      userProfile();
    }
  },[])

  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {!isLogin && (
              <Login />
            )}
            {isLogin && (
              <Redirect to="/CreatePlaylist"></Redirect>
            )}
          </Route>
          <Route path="/CreatePlaylist">
            {!isLogin && (
              <Redirect to="/"></Redirect>
            )}
            <CreatePlaylist profile="/userProfile" />
          </Route>
          <Route path="/userProfile">
              <UserProfile home="/CreatePlaylist" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
