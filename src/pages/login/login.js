import React, { useState, useEffect } from "react";
import { login, register } from "../../firebase/authService.js";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/PageForAllTeams");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await login(email, password);
      localStorage.setItem("loggedIn", "true");
      navigate("/PageForAllTeams");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await register(email, password);
      localStorage.setItem("loggedIn", "true");
      navigate("/PageForAllTeams");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="containerLogin">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={handleRegister}>Criar Conta</button>
    </div>
  );
}
