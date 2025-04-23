import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isUserId, setUserId] = useState(() => {
    // Retrieve the value from localStorage if it exists
    const savedValue = localStorage.getItem("userId");
    return savedValue ? JSON.parse(savedValue) : null;
  });

  useEffect(() => {
    // Save the value to local storage whenever it changes
    localStorage.setItem("userId", JSON.stringify(isUserId));
  }, [isUserId]);

  // const navigate = useNavigate();
  // const [userRole, setUserRole] = useState(() => {
  //   const role = window.localStorage.getItem(ROLE) || "";
  //   return role.toLowerCase();
  // });

  // useEffect(() => {
  //   // Listen for localStorage changes to ensure state remains consistent across tabs
  //   const handleStorageChange = () => {
  //     setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  //     const role = window.localStorage.getItem(ROLE);
  //     setUserRole(role.toLowerCase());
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, [userRole]);

  // const handleLogin = async (email, password) => {
  //   const success = await loginService(email, password);
  //   // const success = true;
  //   if (success) {
  //     setUserRole(success.user.role.toLowerCase());
  //     setIsAuthenticated(true);
  //     // navigate('/home');
  //   }
  //   return success;
  // };

  // const handleLogout = async () => {
  //   localStorage.removeItem("isAuthenticated");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("role");
  //   setIsAuthenticated(false);
  //   setUserRole("");
  // };

  return (
    <AuthContext.Provider
      value={{
        isUserId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
