import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useHome = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/api/home");
        setStrategies(data || []);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { strategies, loading };
};

export default useHome;