import React, { createContext, useState } from "react";

// create a context, the state will be stored and will be managed through authcontext this will be provided to the whole application
export const AuthContext = createContext();
// we will wrap the app with the context provider so the app will be inside the provider-here children means the app
export const AuthProvider = ({ children }) => {
  // authprovider's children(ie is to app) should token pass
  // save token, access token, remove token
  // to store token create state
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
