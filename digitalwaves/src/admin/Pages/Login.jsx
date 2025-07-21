import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem("adminKey", res.adminKey);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[rgb(24,42,58)]">
      <div className="flex flex-col items-center p-6 bg-white rounded shadow w-96">
  
        <div className="w-40 h-40 mb-4">
            <DotLottieReact
        src="https://lottie.host/8b4cb024-ea51-42f0-b08e-f62bf9697d3d/7k0tPi16jd.lottie"
        loop
        autoplay
      />
        </div>

        <h2 className="mb-4 text-xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
  className="w-full p-2 text-white rounded"
  style={{ backgroundColor: "rgb(223,107,41)" }}
>
  Login
</button>
        </form>
      </div>
    </div>
  );
}