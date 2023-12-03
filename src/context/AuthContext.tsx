import { getCurrentUser } from "@/lib/appwrite/api";
import { UserType } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const InitialUser = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
  isAdmin: false,
}

const InitialState = {
  user: InitialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
}

type ContextType = {
  user: UserType;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

const AuthContext = createContext<ContextType>(InitialState);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>(InitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try{
      const currentAccount = await getCurrentUser();
      if(currentAccount){
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          isAdmin: currentAccount.isAdmin,
        })
        setIsAuthenticated(true);
        return true
  
      }

      return false;
    }catch(err){
      console.log(err);
      return false;
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if(cookieFallback === "[]" || cookieFallback === null || cookieFallback === undefined) navigate("/login");
    checkAuthUser();
  },[])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }
  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>)
}

export const useUserContext= () => useContext(AuthContext);