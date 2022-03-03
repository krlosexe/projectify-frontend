import React, { useState, useMemo, useEffect } from 'react';
import Auth from './pages/Auth';
import { getToken, getUserLocally, deleteLocal } from './utils/token';
import AuthContext from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  const [auth, setAuth] = useState(undefined);
  const [board, setBoard] = useState(0);

  useEffect(() => {
    const token = getToken();
    const user = getUserLocally();
    const data = {
      "token": token,
       "name": user
    };
    if(user) {
      setAuth(data)
      setBoard(0);
    } else {
      setAuth(null);
    }
  }, []);


  const setUser = (user, token) => {
    setAuth({
      name: user,
      token: token
  })
}

const changeDash = (dash) => {
  setBoard(dash);
}

  const logOut = () => {
    deleteLocal();
    setAuth(null);
}

  const authData = useMemo(
    () => ({
      board,
      changeDash,
      auth,
      setUser,
      logOut
    }),
    [auth,board]
  );


  if(auth === undefined) return null;
  console.log(board);
  return (
    <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Dashboard />}
     </AuthContext.Provider>
  );
}

export default App;
