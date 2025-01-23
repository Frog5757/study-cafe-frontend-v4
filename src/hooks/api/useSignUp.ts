import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        name,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/mypage");
    } catch (error) {
      console.error("Error during sign up", error);
      alert("新規登録に失敗しました");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
  };
};
