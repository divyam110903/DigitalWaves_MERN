import axiosInstance from "../lib/axios";

export const login = async (username, password) => {
  const res = await axiosInstance.post("api/admin/login", { username, password });
  return res.data;
};

