import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios.js";

export default function useAbout() {
  const [work, setWork] = useState([]);
  const [why, setWhy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/api/about");
        setWork(data?.work || []);
        setWhy(data?.why || []);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { work, why, loading };
}