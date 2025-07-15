import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios.js";

export default function useClient() {
  const [clients, setClients] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/api/client");
        console.log("Full API Response:", data);
        
        
        setClients(data?.client || []);      
        setValues(data?.data || []);         
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { clients, values, loading };
}