import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define the type for the context value
interface AuthContextType {
  isLogged: boolean;
  login: (token: any, sessionData: any, userData: any) => void;
  logout: () => void;
  sessionData: any;
  userData: any;
  token: string | null;
  getSessionData: () => any;
  getUserData: () => any;
}

// Create the authentication context with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define the props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  const refreshToken = () => {
    fetch("http://localhost:3000/api/auth/update-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        refresh_token: sessionData.refresh_token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setSessionData(data.sessionData);
          setToken(data.sessionData.access_token);
          console.log("Refreshed token", data);
        }
      });
  };

  useEffect(() => {
    const TimerFunction = () => {
      const tokenData = getTokenData();
      if (!token) {
        // No token exists yet, so no need to set up refresh
        return null;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      const sessionExpiryTime = tokenData.expires_at; 
      const buffer = 5 * 60 * 1000;
      const expiresAt = (sessionExpiryTime - currentTime) * 1000;
      const timeUntilCheck = Math.max(10, expiresAt - buffer);

      // Set up recurring check
      const intervalId = setInterval(() => {
        refreshToken();
        
        TimerFunction();
      }, timeUntilCheck);

      return intervalId;
    };

    const timerID = TimerFunction();

    // Clean up interval on component unmount
    return () => {
      if (timerID) clearInterval(timerID);
    };
  }, []);

  const getTokenData = () => {
    if (!token) return null;
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    return tokenData;
  };

  const login = (token: string, sessionData: any, userData: any) => {
    setIsLogged(true);
    setToken(token);
    setSessionData(sessionData);
    setUserData(userData);
  };

  const logout = () => {
    setIsLogged(false);
    setToken(null);
    setSessionData(null);
    setUserData(null);
  };

  const getSessionData = () => {
    return sessionData;
  };
  const getUserData = () => {
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        sessionData,
        userData,
        token,
        getSessionData,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
