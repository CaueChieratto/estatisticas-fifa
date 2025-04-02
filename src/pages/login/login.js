import React, { useState, useEffect } from "react";
import { login, register } from "../../firebase/authService.js";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedKeepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

    if (storedKeepLoggedIn) {
      navigate("/PageForAllTeams");
    }

    if (storedEmail && storedKeepLoggedIn) {
      setEmail(storedEmail);
      setKeepLoggedIn(true);
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

      if (keepLoggedIn) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("keepLoggedIn", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.setItem("keepLoggedIn", "false");
      }

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
    <div className="bodyLogin">
      <div className="containerLogin">
        <h2>Faça seu Login</h2>
        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputField"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="buttonLogin" onClick={handleLogin}>
          Entrar
        </button>
        <button className="buttonRegister" onClick={handleRegister}>
          Criar Conta
        </button>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            className="checkboxInput"
            id="keepLoggedIn"
            checked={keepLoggedIn}
            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
          />
          <label htmlFor="keepLoggedIn">Manter logado</label>
        </div>
      </div>
    </div>
  );
}
