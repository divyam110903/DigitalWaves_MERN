
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useContact = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/api/contact");
        setContact(data || []);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { contact, loading };
};

export default useContact;