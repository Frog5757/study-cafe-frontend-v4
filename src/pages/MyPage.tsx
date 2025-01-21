/** @jsxImportSource @emotion/react */
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const handleLogout = async (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const MyPage = () => {
  const navigate = useNavigate();
  return(
  <>
    <Header />
    <PageTitle title="マイページ" />
    <BodyLayout>
      <BodyMainTitle title="ユーザー情報" />
      <button onClick={() => handleLogout(navigate)}>ログアウト</button>
    </BodyLayout>
  </>)
};
