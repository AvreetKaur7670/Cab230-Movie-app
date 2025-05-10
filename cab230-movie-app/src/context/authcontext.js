// import { createContext, useState, useEffect } from 'react';
// import { refreshToken } from '../api/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [refreshTokenValue, setRefreshTokenValue] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedRefreshToken = localStorage.getItem('refreshToken');
//     const storedUser = localStorage.getItem('user');
    
//     if (storedToken && storedRefreshToken) {
//       setToken(storedToken);
//       setRefreshTokenValue(storedRefreshToken);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData, tokens) => {
//     setUser(userData);
//     setToken(tokens.bearerToken.token);
//     setRefreshTokenValue(tokens.refreshToken.token);
//     localStorage.setItem('token', tokens.bearerToken.token);
//     localStorage.setItem('refreshToken', tokens.refreshToken.token);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = async () => {
//     try {
//       await logoutUser(refreshTokenValue);
//     } finally {
//       setUser(null);
//       setToken(null);
//       setRefreshTokenValue(null);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//     }
//   };

//   const refreshAuthToken = async () => {
//     try {
//       const response = await refreshToken(refreshTokenValue);
//       setToken(response.bearerToken.token);
//       setRefreshTokenValue(response.refreshToken.token);
//       localStorage.setItem('token', response.bearerToken.token);
//       localStorage.setItem('refreshToken', response.refreshToken.token);
//       return response.bearerToken.token;
//     } catch (error) {
//       logout();
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, refreshAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// import { createContext, useState, useEffect } from 'react';
// import { refreshToken } from '../api/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [refreshTokenValue, setRefreshTokenValue] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedRefreshToken = localStorage.getItem('refreshToken');
//     const storedUser = localStorage.getItem('user');
    
//     if (storedToken && storedRefreshToken) {
//       setToken(storedToken);
//       setRefreshTokenValue(storedRefreshToken);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData, tokens) => {
//     setUser(userData);
//     setToken(tokens.bearerToken.token);
//     setRefreshTokenValue(tokens.refreshToken.token);
//     localStorage.setItem('token', tokens.bearerToken.token);
//     localStorage.setItem('refreshToken', tokens.refreshToken.token);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = async () => {
//     try {
//       await logoutUser(refreshTokenValue);
//     } finally {
//       setUser(null);
//       setToken(null);
//       setRefreshTokenValue(null);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//     }
//   };

//   const refreshAuthToken = async () => {
//     try {
//       const response = await refreshToken(refreshTokenValue);
//       setToken(response.bearerToken.token);
//       setRefreshTokenValue(response.refreshToken.token);
//       localStorage.setItem('token', response.bearerToken.token);
//       localStorage.setItem('refreshToken', response.refreshToken.token);
//       return response.bearerToken.token;
//     } catch (error) {
//       logout();
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, refreshAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import { createContext, useState, useEffect } from 'react';
import { refreshToken } from '../api/auth'; // make sure this exists and works

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshTokenValue(storedRefreshToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, tokens) => {
    setUser(userData);
    setToken(tokens.bearerToken.token);
    setRefreshTokenValue(tokens.refreshToken.token);
    localStorage.setItem('token', tokens.bearerToken.token);
    localStorage.setItem('refreshToken', tokens.refreshToken.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Ensure logoutUser function is defined in your project
      await logoutUser(refreshTokenValue); 
    } finally {
      setUser(null);
      setToken(null);
      setRefreshTokenValue(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  const refreshAuthToken = async () => {
    try {
      const response = await refreshToken(refreshTokenValue);
      setToken(response.bearerToken.token);
      setRefreshTokenValue(response.refreshToken.token);
      localStorage.setItem('token', response.bearerToken.token);
      localStorage.setItem('refreshToken', response.refreshToken.token);
      return response.bearerToken.token;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
