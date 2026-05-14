import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getToken } = useAuth();

  const loadCreditData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });
      console.log(data);

      if (data.success) {
        setCredit(data.credit);
        console.log(data.credit);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
